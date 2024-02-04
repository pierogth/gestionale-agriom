<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Employee;
use App\Models\Land;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Shop::select([
      'id',
      'type as Tipologia',
      'amount as €',
      'data as Data',
    ])->get();
    return Inertia::render('Lands', [
      'products' => $products,
      'resource' => 'Spese',
      'route' => 'shops',
      'addname' => 'spesa',
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
    $lands = Land::all();
    $employees = Employee::all();
    return Inertia::render('Shop/Create', [
      'lands' => $lands,
      'employees' => $employees,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'type' => 'required|string|max:255',

      'amount' => 'required|decimal:0,5',

      'description' => 'required|string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = new Shop();

    $product->type = $request->type;

    $product->data = $request->data;

    $product->land_id = $request->selectedLands[0]['id'];

    $product->employee_id = $request->selectedEmployees[0]['id'];

    $product->amount = $request->amount;

    $product->description = $request->description;

    if ($request->hasFile('file')) {
      $file = $request->file('file');

      $name = time() . '.' . $file->getClientOriginalExtension();

      //$destinationPath = public_path('/files');
      $destinationPath = storage_path('app/files');

      $file->move($destinationPath, $name);

      $product->file = $name;
    }

    $product->save();

    return redirect()
      ->route('retailers.index')
      ->with('success', 'Shop created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(Shop $shop)
  {
    $sh = Shop::select([
      'id',
      'type',
      'amount',
      'description',
      'data',
      'file',
      'land_id',
      'employee_id',
    ])
      ->with('employee', 'land')
      ->where('id', $shop['id'])
      ->get()
      ->toArray();
    if ($sh[0]['employee'] !== null) {
      $sh[0]['employee'] = $sh[0]['employee']['namesurname'];
    }
    if ($sh[0]['land'] !== null) {
      $sh[0]['land'] = $sh[0]['land']['name'];
    }

    //dd($land);
    // dd($sh[0]);

    return Inertia::render('Shop/Show', [
      'shop' => $sh[0],
      /*   'resource' => 'Magazzino',
      'addname' => 'Prodotto',
      'route' => 'products', */
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Shop $shop)
  {
    $lands = Land::all();
    $employees = Employee::all();
    $editshop = Shop::find($shop['id']);
    $selectedLands = Land::find($shop['land_id']);
    $selectedEmployee = Employee::find($shop['employee_id']);

    return Inertia::render('Shop/Edit', [
      'shop' => $editshop,
      'lands' => $lands,
      'employees' => $employees,
      'selectLand' => $selectedLands,
      'selectEmployee' => $selectedEmployee,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Shop $shop)
  {
    //
    //dd($request);
    $request->validate([
      'type' => 'required|string|max:255',

      'amount' => 'required|decimal:0,5',

      //'description' => 'required|string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = Shop::find($shop['id']);

    $product->type = $request->type;

    $product->data = $request->data;

    $product->land_id = $request->selectedLands[0]['id'];

    $product->employee_id = $request->selectedEmployees[0]['id'];

    $product->amount = $request->amount;

    $product->description = $request->description;

    if ($request->hasFile('file')) {
      $file = $request->file('file');

      $name = time() . '.' . $file->getClientOriginalExtension();

      // $destinationPath = public_path('/files');
      $destinationPath = storage_path('app/files');

      $file->move($destinationPath, $name);

      $product->file = $name;
    }

    $product->save();

    return redirect()
      ->route('retailers.index')
      ->with('success', 'Shop updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Shop $shop)
  {
    $res = Shop::where('id', $shop->id)->delete();
    //
    return $this->index();
  }
}
