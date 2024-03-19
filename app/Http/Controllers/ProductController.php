<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Um;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Product::select([
      'id',
      'image as Immagine',
      'name as Nome',
      'quantity as Quantità',
      'category_id',
      'type as Tipologia',
      'um_id',
      'pieces as N°Pezzi',
    ])->with('category', 'um')->get();

    //dd($products);

    $categories = Category::select([
      'id',
      'name'
    ])->get();

    $ums = Um::select([
      'id',
      'um'
    ])->get();

    return Inertia::render('Lands', [
      'products' => $products,
      'categories' => $categories,
      'resource' => 'Magazzino',
      'addname' => 'Prodotto',
      'route' => 'products',
      'umms'=>$ums
    ]);
    //dd($products);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //qua prendo i prodotti sfusi per la tendina
    $products = Product::where('type', 1)->get();
    $categories = Category::all();
    $ums = Um::all();
    return Inertia::render('Products/Create', ['products' => $products, 'categories'=>$categories, 'ums'=>$ums]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
 //   dd($request);

    //dd($request->input('name'));
    $request->validate([
      'name' => 'required|string|max:255',

      'quantity' => 'required|numeric',

      //'um' => 'required|string|max:255',

      //'category_id' => 'required|numeric',

      //'pieces' => 'required|numeric',

      // 'description' => 'string',

      'lot' => 'required|string',

      'type' => 'required|boolean',

      // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $product = new Product();

    $product->name = $request->name;

    $product->quantity = $request->quantity;

    //$product->um = $request->um;

    $product->um_id = $request->selectedUm[0]['id'];

    $product->category_id = $request->selectedCategory[0]['id'];


    $product->pieces = $request->pieces;

    $product->description = $request->description;

    $product->lot = $request->lot;

    $product->type = $request->type;

    if ($request->hasFile('image')) {
      $image = $request->file('image');

      $name = time() . '.' . $image->getClientOriginalExtension();

      // $destinationPath = public_path('/images');

      Storage::disk('local')->put($name, 'Images');

      //$image->move($destinationPath, $name);

      $product->image = $name;
    }

    if ($request->input('selectedProduct') != '') {
     
      $product->sfuso_id = (int) $request->input('selectedProduct');
      $sfuso = Product::find($request->input('selectedProduct'));
      $sfuso->quantity =
        $sfuso->quantity - $product->quantity * $product->pieces;
      $sfuso->save();
    }

    $product->save();

    return redirect()
      ->route('products.index')
      ->with('success', 'Product created successfully.');

    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Product $product)
  {//dd($product);
    $category = Category::find($product['category_id']);
    $um = Um::find($product['um_id']);

    return Inertia::render('Products/Show', [
      'product' => $product,
      'category' => $category->name,
      'um' => $um->um
      /*   'resource' => 'Magazzino',
      'addname' => 'Prodotto',
      'route' => 'products', */
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Product $product)
  {
    // dd($product->id);

    $editproduct = Product::find($product->id);
    $categories = Category::all();
    $selectedCategory = Category::find($product['category_id']);
    $ums = Um::all();
    $selectedUm = Um::find($product['um_id']);



    //qua prendo i prodotti sfusi per la tendina
    $products = Product::where('type', 1)->get();
    return Inertia::render('Products/Edit', [
      'product' => $editproduct,
      'products' => $products,
      'categories' => $categories,
      'selectCategory' => $selectedCategory,
      'ums' => $ums,
      'selectUm' => $selectedUm
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Product $product)
  {
    // dd(php_ini_loaded_file());
    //
    //dd($request);
    $request->validate([
      'name' => 'required|string|max:255',

      'quantity' => 'required|numeric',

      //'um' => 'required|string|max:255',

      //'category' => 'required|string|max:255',

      //'pieces' => 'required|numeric',

      // 'description' => 'string',

      'lot' => 'required|string',

      'type' => 'required|boolean',

      // 'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $product = Product::find($product['id']);

    $product->name = $request->name;

    if ($request->input('selectedProduct') != '') {
      $sfuso = Product::find($request->input('selectedProduct'));
      //dd($sfuso);
      //annullo la sottrazione precedents
      $sfuso->quantity =
        $sfuso->quantity + $product['quantity'] * $product['pieces'];

      /*   dd(
        $product['quantity'],
        $product['pieces'],
        (int) $request->quantity,
        (int) $request->pieces
      ); */
      $product['quantity'] = (float) $request->quantity;
      $product['pieces'] = (int) $request->pieces;
      $sfuso->quantity =
        $sfuso->quantity - $product['quantity'] * $product['pieces'];
      $sfuso->save();
      // dd($sfuso);
    }

 //   $product->um = $request->um;

 $product->um_id = $request->selectedUm[0]['id'];

  //  $product->category = $request->category;
  $product->category_id = $request->selectedCategory[0]['id'];

    $product->quantity = $request->quantity;

    $product->pieces = $request->pieces;

    $product->description = $request->description;

    $product->lot = $request->lot;

    $product->type = $request->type;
    //dd($request->hasFile('image'));
    if ($request->hasFile('image')) {
      $image = $request->file('image');

      $name = time() . '.' . $image->getClientOriginalExtension();

      $destinationPath = storage_path('app/images');

      //Storage::disk('local')->put($name, 'Images');

      $image->move($destinationPath, $name);

      $product->image = $name;
    }

    $product->save();

    return redirect()
      ->route('products.index')
      ->with('success', 'Product created successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $product)
  {
    //dd($product);
    $res = Product::where('id', $product->id)->delete();
    //
    return $this->index();
  }
}
