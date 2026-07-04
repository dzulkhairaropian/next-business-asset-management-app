@extends('layouts.app')

@section('content')
    <div class="grid grid-cols-12 gap-4 md:gap-6">

        <!-- Dashboard Header -->
        <div class="col-span-12">
            <x-common.page-breadcrumb pageTitle="IT Assets Dashboard" />
        </div>

        <!-- Metrics Widgets -->
        <div class="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
            <!-- Total Assets -->
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all hover:shadow-theme-md">
                <div class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 text-brand-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                </div>
                <div class="flex items-end justify-between mt-5">
                    <div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Total Assets</span>
                        <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ $totalAssets }}</h4>
                    </div>
                </div>
            </div>

            <!-- Ready to Deploy -->
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all hover:shadow-theme-md">
                <div class="flex items-center justify-center w-12 h-12 bg-success-50 rounded-xl dark:bg-success-500/10 text-success-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11"></polyline></svg>
                </div>
                <div class="flex items-end justify-between mt-5">
                    <div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Ready to Deploy</span>
                        <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ $readyToDeploy }}</h4>
                    </div>
                </div>
            </div>

            <!-- Deployed -->
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all hover:shadow-theme-md">
                <div class="flex items-center justify-center w-12 h-12 bg-brand-50 rounded-xl dark:bg-brand-500/10 text-brand-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div class="flex items-end justify-between mt-5">
                    <div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Deployed</span>
                        <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ $deployed }}</h4>
                    </div>
                </div>
            </div>

            <!-- Broken -->
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all hover:shadow-theme-md">
                <div class="flex items-center justify-center w-12 h-12 bg-error-50 rounded-xl dark:bg-error-500/10 text-error-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                </div>
                <div class="flex items-end justify-between mt-5">
                    <div>
                        <span class="text-sm text-gray-500 dark:text-gray-400">Broken / Defective</span>
                        <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{{ $broken }}</h4>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="col-span-12 xl:col-span-6">
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Asset Status Distribution</h3>
                @if($totalAssets > 0)
                    <div id="assetStatusChart" class="h-80"></div>
                @else
                    <div class="flex flex-col items-center justify-center h-80 text-center">
                        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 dark:bg-gray-800">
                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <p class="text-gray-500 dark:text-gray-400 font-medium">No asset data available</p>
                        <p class="text-sm text-gray-400 mt-1">Start adding assets to see distribution.</p>
                    </div>
                @endif
            </div>
        </div>

        <div class="col-span-12 xl:col-span-6">
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 h-full">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Consumables Stock</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Total Stock</span>
                        <span class="font-bold text-gray-800 dark:text-white/90">{{ number_format($totalConsumables) }} Units</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div class="bg-brand-500 h-2.5 rounded-full" style="width: {{ $totalConsumables > 0 ? '70%' : '0%' }}"></div>
                    </div>
                    @if($totalConsumables == 0)
                        <div class="pt-4 text-center">
                            <p class="text-sm text-gray-400 italic">No consumables in inventory.</p>
                        </div>
                    @else
                        <p class="text-xs text-gray-500 italic">Showing aggregate of all consumable items.</p>
                    @endif
                </div>
            </div>
        </div>

        <!-- Recent Activities (Assets) -->
        <div class="col-span-12 lg:col-span-6">
            <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 h-full">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Recent Asset Checkouts</h3>
                <div class="max-w-full overflow-x-auto">
                    <table class="min-w-full">
                        <thead>
                            <tr class="border-t border-gray-100 dark:border-gray-800">
                                <th class="py-3 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400">Asset</th>
                                <th class="py-3 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400">Assigned To</th>
                                <th class="py-3 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($recentCheckouts as $checkout)
                                <tr class="border-t border-gray-100 dark:border-gray-800">
                                    <td class="py-3 whitespace-nowrap">
                                        <div class="flex items-center gap-3">
                                            <div>
                                                <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ $checkout->asset->device_name ?? 'Unknown' }}</p>
                                                <span class="text-gray-500 text-theme-xs dark:text-gray-400">{{ $checkout->asset->asset_tag }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-3 whitespace-nowrap text-gray-500 text-theme-sm dark:text-gray-400">
                                        {{ $checkout->checkedOutToUser->name ?? 'N/A' }}
                                    </td>
                                    <td class="py-3 whitespace-nowrap text-gray-500 text-theme-sm dark:text-gray-400">
                                        {{ $checkout->checked_out_at->format('M d, Y') }}
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="3" class="py-10 text-center">
                                        <div class="flex flex-col items-center justify-center">
                                            <svg class="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <p class="text-sm text-gray-400 italic">No recent asset assignments.</p>
                                        </div>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Recent Activities (Consumables) -->
        <div class="col-span-12 lg:col-span-6">
            <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 h-full">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Recent Consumable Checkouts</h3>
                <div class="max-w-full overflow-x-auto">
                    <table class="min-w-full">
                        <thead>
                            <tr class="border-t border-gray-100 dark:border-gray-800">
                                <th class="py-3 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400">Item</th>
                                <th class="py-3 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400">Qty</th>
                                <th class="py-3 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400">To User</th>
                                <th class="py-3 text-left font-medium text-gray-500 text-theme-xs dark:text-gray-400">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($recentConsumableCheckouts as $transaction)
                                <tr class="border-t border-gray-100 dark:border-gray-800">
                                    <td class="py-3 whitespace-nowrap">
                                        <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">{{ $transaction->consumable->product->name ?? 'Unknown' }}</p>
                                    </td>
                                    <td class="py-3 whitespace-nowrap text-gray-500 text-theme-sm dark:text-gray-400 font-bold">
                                        {{ $transaction->quantity }}
                                    </td>
                                    <td class="py-3 whitespace-nowrap text-gray-500 text-theme-sm dark:text-gray-400">
                                        {{ $transaction->checkedOutToUser->name ?? 'N/A' }}
                                    </td>
                                    <td class="py-3 whitespace-nowrap text-gray-500 text-theme-sm dark:text-gray-400">
                                        {{ $transaction->transaction_date->format('M d, H:i') }}
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="py-10 text-center">
                                        <div class="flex flex-col items-center justify-center">
                                            <svg class="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                            <p class="text-sm text-gray-400 italic">No recent consumable checkouts.</p>
                                        </div>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
@endsection

@push('scripts')
@if($totalAssets > 0)
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const options = {
            series: @json($chartData['data']),
            chart: {
                fontFamily: "Outfit, sans-serif",
                type: 'donut',
                height: 320,
            },
            labels: @json($chartData['labels']),
            colors: @json($chartData['colors']),
            legend: {
                position: 'bottom',
                fontFamily: "Outfit",
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        labels: {
                            show: true,
                            name: { show: true },
                            value: {
                                show: true,
                                fontSize: '24px',
                                fontWeight: 'bold'
                            },
                            total: {
                                show: true,
                                label: 'Total Assets',
                                formatter: function (w) {
                                    return {{ $totalAssets }}
                                }
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            }
        };

        const chart = new ApexCharts(document.querySelector("#assetStatusChart"), options);
        chart.render();
    });
</script>
@endif
@endpush
