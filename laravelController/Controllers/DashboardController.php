<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetCheckout;
use App\Models\Consumable;
use App\Models\Status;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Summary Metrics
        $totalAssets = Asset::count();
        $totalConsumables = Consumable::sum('quantity');
        
        // Status counts for Widgets
        $readyToDeploy = Asset::whereHas('status', function($q) {
            $q->where('name', 'Ready to Deploy');
        })->count();
        
        $deployed = Asset::whereHas('status', function($q) {
            $q->where('name', 'Deployed');
        })->count();
        
        $broken = Asset::whereHas('status', function($q) {
            $q->where('name', 'Broken');
        })->count();

        // Recent Activities
        $recentCheckouts = AssetCheckout::with(['asset', 'checkedOutToUser'])
            ->latest('checked_out_at')
            ->limit(5)
            ->get();

        // Recent Consumable Checkouts
        $recentConsumableCheckouts = \App\Models\ConsumableTransaction::with(['consumable.product', 'checkedOutToUser'])
            ->where('type', 'checkout')
            ->latest('transaction_date')
            ->limit(5)
            ->get();

        // Chart Data: Assets by Status
        $statuses = Status::whereHas('masterCategory', function($q) {
            $q->where('name', 'IT Asset');
        })->get();
        
        $chartData = [
            'labels' => $statuses->pluck('name'),
            'data' => $statuses->map(function($status) {
                return Asset::where('status_id', $status->id)->count();
            }),
            'colors' => $statuses->map(function($status) {
                return match($status->color) {
                    'success' => '#12B76A',
                    'primary' => '#465FFF',
                    'danger' => '#F04438',
                    'warning' => '#F79009',
                    default => '#98A2B3'
                };
            })
        ];

        return view('pages.dashboard.it-assets', compact(
            'totalAssets', 
            'totalConsumables', 
            'readyToDeploy', 
            'deployed', 
            'broken',
            'recentCheckouts',
            'recentConsumableCheckouts',
            'chartData'
        ));
    }
}
