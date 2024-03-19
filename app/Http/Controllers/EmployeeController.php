<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Employee::select([
      'id',
      'namesurname as Nome',
      'category as Categoria',
      'credit as Credito',
      'shops as Spese',
      'workhours as N°ore Lavoro',
      'ehour as €-ora',
      //'id as xxx'
    ])->get();
    return Inertia::render('Lands', [
      'products' => $products,
      'resource' => 'Collaboratori',
      'route' => 'employees',
      'addname' => 'Collaboratore',
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
    return Inertia::render('Employee/Create', []);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'namesurname' => 'required|string|max:255',

      'category' => 'required|string',

      'credit' => 'required|decimal:0,5',

      'shops' => 'required|decimal:0,5',

      'workhours' => 'required|decimal:0,5',

      'ehours' => 'required|decimal:0,5',
    ]);

    $product = new Employee();

    $product->namesurname = $request->namesurname;

    $product->category = $request->category;

    $product->credit = $request->credit;

    //$product->description = $request->description;

    $product->shops = $request->shops;

    $product->workhours = $request->workhours;

    $product->ehour = $request->ehours;

    $product->save();

    return redirect()
      ->route('employees.index')
      ->with('success', 'Employee created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(Employee $employee)
  {
    return Inertia::render('Employee/Show', [
      'employee' => $employee,
      /*   'resource' => 'Magazzino',
      'addname' => 'Prodotto',
      'route' => 'products', */
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Employee $employee)
  {
    //
    $editemployee = Employee::find($employee['id']);
    return Inertia::render('Employee/Edit', ['employee' => $editemployee]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Employee $employee)
  {
    //
    $request->validate([
      'namesurname' => 'required|string|max:255',

      'category' => 'required|string',

      'credit' => 'required|decimal:0,5',

      'shops' => 'required|decimal:0,5',

      'workhours' => 'required|decimal:0,5',

      'ehour' => 'required|decimal:0,5',
    ]);

    $product = Employee::find($employee['id']);

    $product->namesurname = $request->namesurname;

    $product->category = $request->category;

    $product->credit = $request->credit;

    //$product->description = $request->description;

    $product->shops = $request->shops;

    $product->workhours = $request->workhours;

    $product->ehour = $request->ehour;

    $product->save();

    return redirect()
      ->route('employees.index')
      ->with('success', 'Employee updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Employee $employee)
  {
    $res = Employee::where('id', $employee->id)->delete();
    //
    return $this->index();
  }
}
