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

    $product->amount = $request->amount;

    $product->description = $request->description;

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
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Shop $shop)
  {
    $lands = Land::all();
    $employees = Employee::all();
    $editshop = Shop::find($shop['id']);
    return Inertia::render('Shop/Edit', [
      'shop' => $editshop,
      'lands' => $lands,
      'employees' => $employees,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Shop $shop)
  {
    //
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
