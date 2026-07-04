<?php

use App\Http\Controllers\Master\CompanyController;
use App\Http\Controllers\Master\DepartmentController;
use App\Http\Controllers\Master\PositionController;
use App\Http\Controllers\Master\LocationController;
use App\Http\Controllers\Master\BrandController;
use App\Http\Controllers\Master\MasterCategoryController;
use App\Http\Controllers\Master\CategoryController;
use App\Http\Controllers\Master\StatusController;
use App\Http\Controllers\Master\VendorController;
use App\Http\Controllers\Master\OperatingSystemController;
use App\Http\Controllers\Master\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('signin', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('signin', [LoginController::class, 'login']);
    
    Route::get('signup', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('signup', [RegisterController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Master Data Routes
    Route::resource('companies', CompanyController::class);
    Route::resource('departments', DepartmentController::class);
    Route::resource('positions', PositionController::class);
    Route::resource('locations', LocationController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('master-categories', MasterCategoryController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('statuses', StatusController::class);
    Route::resource('vendors', VendorController::class);
    Route::resource('operating-systems', OperatingSystemController::class);
    Route::resource('products', ProductController::class);

    // Profile Routes
    Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');

    // User & Role Management
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');
});
