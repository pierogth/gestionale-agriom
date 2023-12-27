<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Entry::select([
      'payer as Pagante',
      /* TODO prodotto/i */
      'payment_type as Tipo Pagamento',
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
  public function show(Entry $entry)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Entry $entry)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Entry $entry)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Entry $entry)
  {
    //
  }
}
