<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\ProductEntry;

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

    if (
      $request->input('selectedRetailer') != 'nessun rivenditore' &&
      $request->input('is_payed') == true
    ) {
      $myretail = Retailer::find($request->input('selectedRetailer'));
      $myretail->balance = $myretail->balance - $request->input('quantity');
      $myretail->save();
    }

    if ($request->hasFile('file')) {
      $file = $request->file('file');

      $name = time() . '.' . $file->getClientOriginalExtension();

      //$destinationPath = public_path('/files');
      $destinationPath = storage_path('app/files');

      $file->move($destinationPath, $name);

      $product->file = $name;
    }

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
    $selectedProducts = ProductEntry::select(
      'product_id as id',
      'entry_id',
      'quantity'
    )
      ->where('entry_id', $entry['id'])
      ->get();
    return Inertia::render('Entry/Edit', [
      'entry' => $editentry,
      'products' => $products,
      'retailers' => $retailers,
      'selectProducts' => $selectedProducts,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Entry $entry)
  {
    //
    $request->validate([
      'quantity' => 'required|decimal:0,5',

      'is_payed' => 'required|boolean',

      //'type' => 'required|string',

      'payer' => 'required|string',

      //'description' => 'required|string',

      //'payment_type' => 'required|string',

      'data' => 'required|date',

      //'file' => 'required|file',
    ]);

    $product = Entry::find($entry['id']);

    $product->quantity = $request->quantity;

    $product->is_payed = $request->is_payed;

    $product->type = 1;

    $product->payer = $request->payer;

    $product->payment_type = $request->payment_type;

    $product->description = $request->description;

    $product->data = $request->data;

    if (
      $request->input('selectedRetailer') != 'nessun rivenditore' &&
      $request->input('is_payed') == true
    ) {
      $myretail = Retailer::find($request->input('selectedRetailer'));
      $myretail->balance = $myretail->balance - $request->input('quantity');
      $myretail->save();
    }

    if ($request->hasFile('file')) {
      $file = $request->file('file');

      $name = time() . '.' . $file->getClientOriginalExtension();

      //$destinationPath = public_path('/files');
      $destinationPath = storage_path('app/files');

      $file->move($destinationPath, $name);

      $product->file = $name;
    }

    $product->save();

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
        /* ProductEntry::create([
          'product_id' => $mioprod['id'],
          'entry_id' => $product->id,
          'quantity' => $mioprod['quantity'],
        ]); */
      }
      $product->products()->sync($mySync);
    }

    return redirect()
      ->route('entries.index')
      ->with('success', 'Entry updated successfully.');
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
