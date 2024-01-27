<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Product;
use App\Models\Retailer;

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
      'id',
      'payer as Pagante',
      /* TODO prodotto/i */
      'payment_type as Tipo Pagamento',
      'data as Data',
    ])->get();
    return Inertia::render('Lands', [
      'products' => $products,
      'resource' => 'Entrate',
      'route' => 'entries',
      'addname' => 'entrata',
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
    $retailers = Retailer::all();
    $products = Product::where('type', 1)->get();
    return Inertia::render('Entry/Create', [
      'products' => $products,
      'retailers' => $retailers,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
    $request->validate([
      'quantity' => 'required|decimal:0,5',

      'is_payed' => 'required|boolean',

      'type' => 'required|string',

      'payer' => 'required|string',

      'description' => 'required|string',

      'payment_type' => 'required|string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = new Entry();

    $product->quantity = $request->quantity;

    $product->is_payed = $request->is_payed;

    $product->type = 1;

    $product->payer = $request->payer;

    $product->payment_type = $request->payment_type;

    $product->description = $request->description;

    $product->data = $request->data;

    if (!empty($request->input('selectedProducts'))) {
      foreach ($request->input('selectedProducts') as $mioprod) {
        $myprod = Product::find($mioprod['id']);
        $myprod->quantity = $myprod->quantity - $mioprod['quantity'];
        $myprod->save();
      }
    }

    if (
      $request->input('selectedRetailer') != 'nessun rivenditore' &&
      $request->input('is_payed') == true
    ) {
      $myretail = Retailer::find($request->input('selectedRetailer'));
      $myretail->balance = $myretail->balance - $request->input('quantity');
      $myretail->save();
    }

    $product->save();

    return redirect()
      ->route('entries.index')
      ->with('success', 'Entry created successfully.');
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
    $retailers = Retailer::all();
    $products = Product::where('type', 1)->get();
    $editentry = Entry::find($entry['id']);
    return Inertia::render('Entry/Edit', [
      'entry' => $editentry,
      'products' => $products,
      'retailers' => $retailers,
    ]);
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
    $res = Entry::where('id', $entry->id)->delete();
    //
    return $this->index();
  }
}
