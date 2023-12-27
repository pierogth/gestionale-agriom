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
      'name as Nome',
      'owner as Proprietario',
      'dimension as Superficie',
      'coltivation as Tipologia',
      'workhours as N°ore Lavoro',
    ])->get();
    return Inertia::render('Lands', [
      'products' => $products,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Land $land)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Land $land)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Land $land)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Land $land)
  {
    //
  }
}
