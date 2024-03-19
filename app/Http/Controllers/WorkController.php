<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\WorkEmployee;
use App\Models\WorkLand;
use App\Models\EmployeeLand;

use App\Models\Employee;
use App\Models\Land;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class WorkController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Work::select([DB::raw('
      id,
      `where` as Dove,
      description as `Che Cosa`,
      workhours as Ore,
      ehour as `€-ora`,
      (workhours * ehour) as `€-TOT`,
      data as Data,
      updated_at as `Ultima Modifica`
')
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

      //'description' => 'string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = new Work();

    $land = Land::find($request->where);

    $product->where = $land->name;

    $product->data = $request->data;

    $product->ehour = $request->ehour;

    $product->land_id = $request->where;

    $land = Land::find($request->where);
    $land->workhours += $request->workhours;
    $land->save();

    $product->workhours = $request->workhours;

    $product->description = $request->description;

    $product->save();

    if (!empty($request->input('selectedEmployees'))) {
      foreach ($request->input('selectedEmployees') as $mioprod) {
        $myprod = Employee::find($mioprod['id']);
        // dd($myprod->workhours, $myprod->ehour, $mioprod['quantity']);
        $myprod->workhours = $myprod->workhours + (int) $mioprod['quantity'];
        $myprod->credit += (int) $mioprod['quantity'] * $product->ehour;
        //  dd($myprod['workhours'], $product->ehour, $mioprod);
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
    $entri = Work::select([
      'id',
      'where',
      'land_id',
      'description',
      'ehour',
      'workhours',
      'data',
    ])
      ->with('employees')
      ->where('id', $work['id'])
      ->get()
      ->toArray();

    //$entri[0]['employee'] = $entri[0]['employee']['namesurname'];

    //$entri[0]['retailer'] = $entri[0]['retailer']['name'];
    //dd($entri[0]);
    //dd($land);
    // dd($sh[0]);

    return Inertia::render('Work/Show', [
      'work' => $entri[0],
      /*   'resource' => 'Magazzino',
      'addname' => 'Prodotto',
      'route' => 'products', */
    ]);
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

      //'description' => 'string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = Work::find($work['id']);

    $land = Land::find($request->where);

    $product->land_id = $request->where;

    //annullo precedents
    $land->workhours -= $product->workhours;

    $land->workhours += $request->workhours;
    $land->save();

    $product->where = $land->name;

    $product->data = $request->data;

    $selectedEmp = WorkEmployee::select(
      'work_id as id',
      'employee_id',
      'nrhours'
    )
      ->where('work_id', $work['id'])
      ->get()
      ->toArray();

    if (!empty($request->input('selectedEmployees'))) {
      $mySync = [];
      foreach ($request->input('selectedEmployees') as $key => $mioprod) {
        $myprod = Employee::find($mioprod['id']);
        //annullo precedents
        $myprod->workhours = $myprod->workhours - $selectedEmp[$key]['nrhours'];
        //$myprod->credit = $myprod->workhours * $myprod->ehour;
        $myprod->workhours = $myprod->workhours + (int) $mioprod['quantity'];
        $myprod->credit += (int) $mioprod['quantity'] * $product->ehour;
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

    $product->ehour = $request->ehour;

    $product->workhours = $request->workhours;

    $product->description = $request->description;

    $product->save();
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
