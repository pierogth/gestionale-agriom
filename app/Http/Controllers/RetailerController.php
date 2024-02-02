<?php

namespace App\Http\Controllers;

use App\Models\Retailer;
use App\Models\Product;
use App\Models\ProductRetail;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RetailerController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Retailer::select([
      'id',
      'name as Nome',
      'place as Luogo',
      /*'type as Tipologia',*/
      'balance as Saldo',
    ])->get();
    return Inertia::render('Lands', [
      'products' => $products,
      'resource' => 'Rivenditori',
      'route' => 'retailers',
      'addname' => 'rivenditore',
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
    $products = Product::all();
    return Inertia::render('Retailer/Create', ['products' => $products]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'name' => 'required|string|max:255',

      'place' => 'required|string',

      'balance' => 'required|decimal:0,5',
    ]);

    $product = new Retailer();

    $product->name = $request->name;

    $product->place = $request->place;

    $product->balance = $request->balance;

    $product->save();

    if (!empty($request->input('selectedProducts'))) {
      foreach ($request->input('selectedProducts') as $mioprod) {
        $myprod = Product::find($mioprod['id']);
        $myprod->quantity = $myprod->quantity - $mioprod['quantity'];
        $myprod->save();
        //creo i record nella pivot
        ProductEntry::create([
          'product_id' => $mioprod['id'],
          'entry_id' => $product->id,
          'quantity' => $mioprod['quantity'],
        ]);
      }
    }

    return redirect()
      ->route('retailers.index')
      ->with('success', 'Retailer created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(Retailer $retailer)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Retailer $retailer)
  {
    //
    $products = Product::all();
    $editretailer = Retailer::find($retailer['id']);
    $selectedProducts = ProductRetail::select(
      'product_id as id',
      'retailer_id',
      'quantity'
    )
      ->where('retailer_id', $retailer['id'])
      ->get();
    return Inertia::render('Retailer/Edit', [
      'retailer' => $editretailer,
      'products' => $products,
      'selectProducts' => $selectedProducts,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Retailer $retailer)
  {
    //
    $request->validate([
      'name' => 'required|string|max:255',

      'place' => 'required|string',

      'balance' => 'required|decimal:0,5',
    ]);

    $product = Retailer::find($retailer['id']);

    $product->name = $request->name;

    $product->place = $request->place;

    $product->balance = $request->balance;

    if (!empty($request->input('selectedProducts'))) {
      $mySync = [];
      foreach ($request->input('selectedProducts') as $mioprod) {
        $myprod = Product::find($mioprod['id']);
        $myprod->quantity = $myprod->quantity - $mioprod['quantity'];
        $myprod->save();
        //aggiorno i record nella pivot
        $mySync += [$mioprod['id'] => ['quantity' => $mioprod['quantity']]];
        $mySync[$mioprod['id']] += ['quantity' => $mioprod['quantity']];

        $product->products()->updateExistingPivot($mioprod['id'], [
          'quantity' => $mioprod['quantity'],
        ]);
      }
      $product->products()->sync($mySync);
    }

    $product->save();

    return redirect()
      ->route('retailers.index')
      ->with('success', 'Retailer updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Retailer $retailer)
  {
    $res = Retailer::where('id', $retailer->id)->delete();
    //
    return $this->index();
  }
}
