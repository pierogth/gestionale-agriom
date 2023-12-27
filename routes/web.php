<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::resource('products', App\Http\Controllers\ProductController::class);
Route::resource('lands', App\Http\Controllers\LandController::class);
Route::resource('employees', App\Http\Controllers\EmployeeController::class);
Route::resource('retailers', App\Http\Controllers\RetailerController::class);
Route::resource('shops', App\Http\Controllers\ShopController::class);
Route::resource('entries', App\Http\Controllers\EntryController::class);
Route::resource('works', App\Http\Controllers\WorkController::class);