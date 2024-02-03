<?php

namespace App\Http\Controllers;

use App\Models\Land;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Land::select([
      'id',
      'name as Nome',
      'owner as Proprietario',
      'dimension as Superficie',
      'coltivation as Tipologia',
      'workhours as N°ore Lavoro',
    ])
      ->with('works')
      ->get()
      ->toArray();

    //dd($products);
    return Inertia::render('Lands', [
      'products' => $products,
      'resource' => 'Terreni',
      'route' => 'lands',
      'addname' => 'terreno',
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
    return Inertia::render('Lands/Create', []);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'name' => 'required|string|max:255',

      'dimension' => 'required|string',

      'um' => 'required|string|max:255',

      //'description' => 'string',

      'coltivation' => 'required|string',

      'owner' => 'required|string|max:255',
    ]);

    $product = new Land();

    $product->name = $request->name;

    $product->dimension = $request->dimension;

    $product->um = $request->um;

    //$product->description = $request->description;

    $product->coltivation = $request->coltivation;

    $product->owner = $request->owner;

    $product->save();

    return redirect()
      ->route('lands.index')
      ->with('success', 'Land created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(Land $land)
  {
    $land = Land::select([
      'id',
      'name',
      'owner',
      'dimension',
      'coltivation',
      'workhours',
    ])
      ->with('works')
      ->where('id', $land['id'])
      ->get()
      ->toArray();

    $arrWheres = [];
    foreach ($land[0]['works'] as $work) {
      array_push($arrWheres, $work['description']);
    }
    $land[0]['works'] = $arrWheres;
    //dd($land);

    return Inertia::render('Lands/Show', [
      'land' => $land[0],
      /*   'resource' => 'Magazzino',
      'addname' => 'Prodotto',
      'route' => 'products', */
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Land $land)
  {
    //
    $editland = Land::find($land['id']);
    return Inertia::render('Lands/Edit', ['land' => $editland]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Land $land)
  {
    //
    $request->validate([
      'name' => 'required|string|max:255',

      'dimension' => 'required|string',

      'um' => 'required|string|max:255',

      //'description' => 'string',

      'coltivation' => 'required|string',

      'owner' => 'required|string|max:255',
    ]);

    $product = Land::find($land['id']);

    $product->name = $request->name;

    $product->dimension = $request->dimension;

    $product->um = $request->um;

    //$product->description = $request->description;

    $product->coltivation = $request->coltivation;

    $product->owner = $request->owner;

    $product->save();

    return redirect()
      ->route('lands.index')
      ->with('success', 'Land updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Land $land)
  {
    $res = Land::where('id', $land->id)->delete();
    //
    return $this->index();
  }
}
