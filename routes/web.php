<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UmController;


use App\Http\Controllers\ShopController;
use App\Http\Controllers\EntryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::middleware([
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::get('/dashboard', function () {
    return Inertia::render('Welcome');
  })->name('dashboard');

  Route::resource('products', App\Http\Controllers\ProductController::class);
  Route::post('/products/{product}', [
    ProductController::class,
    'update',
  ])->name('products.update');

  Route::post('/category/create', [
    CategoryController::class,
    'store',
  ])->name('categories.create');

  Route::post('/um/create', [
    UmController::class,
    'store',
  ])->name('ums.create');

  Route::post('/um/delete', [
    UmController::class,
    'destroy',
  ])->name('ums.delete');

  Route::post('/category/delete', [
    CategoryController::class,
    'destroy',
  ])->name('categories.delete');

  Route::resource('lands', App\Http\Controllers\LandController::class);
  Route::resource('employees', App\Http\Controllers\EmployeeController::class);
  Route::resource('retailers', App\Http\Controllers\RetailerController::class);
  Route::resource('shops', App\Http\Controllers\ShopController::class);
  Route::post('/shops/{shop}', [ShopController::class, 'update'])->name(
    'shops.update'
  );
  Route::resource('entries', App\Http\Controllers\EntryController::class);
  Route::post('/entries/{entry}', [EntryController::class, 'update'])->name(
    'entries.update'
  );
  Route::resource('works', App\Http\Controllers\WorkController::class);
});

//Route::resource('categories', App\Http\Controllers\CategoryController::class);