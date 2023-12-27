<?php

namespace App\Http\Controllers;

use App\Models\Retailer;
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
      'name as Nome',
      'place as Luogo',
      /*'type as Tipologia',*/
      'balance as Saldo',
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
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Retailer $retailer)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Retailer $retailer)
  {
    //
  }
}
