<?php

namespace App\Http\Controllers;

use App\Models\Work;
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
      'where as Dove',
      /* TODO collaboratore/i */
      /* TODO ore di lavoro */
      '€-hour as €-ora',
      'data as Data',
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
  public function show(Work $work)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Work $work)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Work $work)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Work $work)
  {
    //
  }
}
