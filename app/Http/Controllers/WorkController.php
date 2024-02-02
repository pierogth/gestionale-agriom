<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\WorkEmployee;
use App\Models\WorkLand;
use App\Models\EmployeeLand;

use App\Models\Employee;
use App\Models\Land;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Work::select([
      'id',
      'where as Dove',
      /* TODO collaboratore/i */
      /* TODO ore di lavoro */
      'ehour as €-ora',
      'data as Data',
    ])->get();
    return Inertia::render('Lands', [
      'products' => $products,
      'resource' => 'Lavorazioni',
      'route' => 'works',
      'addname' => 'lavorazione',
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $employees = Employee::all();
    $lands = Land::all();
    return Inertia::render('Work/Create', [
      'employees' => $employees,
      'lands' => $lands,
    ]);

    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'where' => 'required|string|max:255',

      'ehour' => 'required|decimal:0,5',

      'workhours' => 'required|decimal:0,5',

      'description' => 'required|string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = new Work();

    $land = Land::find($request->where);

    $product->where = $land->name;

    $product->data = $request->data;

    $product->ehour = $request->ehour;

    $product->land_id = $request->where;

    $product->workhours = $request->workhours;

    $product->description = $request->description;

    $product->save();

    if (!empty($request->input('selectedEmployees'))) {
      foreach ($request->input('selectedEmployees') as $mioprod) {
        $myprod = Employee::find($mioprod['id']);
        $myprod->workhours = $myprod->workhours + $mioprod['quantity'];
        $myprod->credit = $myprod->workhours * $myprod->ehour;
        $myprod->save();
        WorkEmployee::create([
          'work_id' => $product->id,
          'employee_id' => $mioprod['id'],
          'nrhours' => $mioprod['quantity'],
        ]);
        EmployeeLand::firstOrCreate([
          'employee_id' => $mioprod['id'],
          'land_id' => $request->where,
        ]);
      }
    }

    WorkLand::create(['work_id' => $product->id, 'land_id' => $request->where]);

    return redirect()
      ->route('retailers.index')
      ->with('success', 'Shop created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(Work $work)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Work $work)
  {
    $editwork = Work::find($work->id);
    //qua prendo i prodotti sfusi per la tendina
    $employees = Employee::all();
    $lands = Land::all();
    $selectedEmployees = WorkEmployee::select(
      'employee_id as id',
      'work_id',
      'nrhours as quantity'
    )
      ->where('work_id', $work['id'])
      ->get();
    return Inertia::render('Work/Edit', [
      'work' => $editwork,
      'employees' => $employees,
      'lands' => $lands,
      'selectEmployees' => $selectedEmployees,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Work $work)
  {
    $request->validate([
      'where' => 'required|string|max:255',

      'ehour' => 'required|decimal:0,5',

      'workhours' => 'required|decimal:0,5',

      'description' => 'required|string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = Work::find($work['id']);

    $land = Land::find($request->where);

    $product->land_id = $request->where;

    $product->where = $land->name;

    $product->data = $request->data;

    $product->ehour = $request->ehour;

    $product->workhours = $request->workhours;

    $product->description = $request->description;

    $product->save();

    if (!empty($request->input('selectedEmployees'))) {
      $mySync = [];
      foreach ($request->input('selectedEmployees') as $mioprod) {
        $myprod = Employee::find($mioprod['id']);
        $myprod->workhours = $myprod->workhours + $mioprod['quantity'];
        $myprod->credit = $myprod->workhours * $myprod->ehour;
        $myprod->save();

        $mySync += [$mioprod['id'] => ['nrhours' => $mioprod['quantity']]];
        $mySync[$mioprod['id']] += ['nrhours' => $mioprod['quantity']];
        $product->employees()->updateExistingPivot($mioprod['id'], [
          'nrhours' => $mioprod['quantity'],
        ]);
        /*    $we = WorkEmployee::updateOrCreate(
          [
            'work_id' => $product->id,
            'employee_id' => $mioprod['id'],
          ],
          ['nrhours' => $mioprod['quantity']]
        ); */

        EmployeeLand::firstOrCreate([
          'employee_id' => $mioprod['id'],
          'land_id' => $request->where,
        ]);
      }
      //dd($mySync);
      $product->employees()->sync($mySync);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Work $work)
  {
    $res = Work::where('id', $work->id)->delete();
    //
    return $this->index();
  }
}
