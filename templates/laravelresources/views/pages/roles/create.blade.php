@extends('layouts.app')

@section('content')
    <div class="space-y-6">
        <x-common.page-breadcrumb pageTitle="Create New Role" />

        <div class="max-w-4xl mx-auto">
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-8">
                <form action="{{ route('roles.store') }}" method="POST" class="space-y-6">
                    @csrf

                    <!-- Role Name -->
                    <div>
                        <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Role Name</label>
                        <input type="text" name="name" value="{{ old('name') }}" required placeholder="e.g. IT Support"
                            class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                        @error('name') <p class="mt-1 text-xs text-error-500">{{ $message }}</p> @enderror
                    </div>

                    <hr class="border-gray-100 dark:border-gray-800">

                    <!-- Permissions Grid -->
                    <div>
                        <label class="mb-4 block font-medium text-gray-800 dark:text-white/90">Permissions</label>
                        
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
                             x-data="{ 
                                toggleAll(checked) {
                                    document.querySelectorAll('.permission-checkbox').forEach(c => c.checked = checked)
                                }
                             }">
                            
                            @php
                                $groupedPermissions = $permissions->groupBy(function($item) {
                                    return explode('.', $item->name)[0] ?? 'general';
                                });
                            @endphp

                            @foreach($groupedPermissions as $group => $items)
                                <div class="space-y-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-white/0">
                                    <h5 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{{ $group }}</h5>
                                    <div class="space-y-2">
                                        @foreach($items as $permission)
                                            <label class="flex items-start gap-2 cursor-pointer group">
                                                <input type="checkbox" name="permissions[]" value="{{ $permission->id }}"
                                                    class="permission-checkbox mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                                                    {{ in_array($permission->id, old('permissions', [])) ? 'checked' : '' }}>
                                                <span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-brand-500 transition-colors">
                                                    {{ str_replace($group . '.', '', $permission->name) }}
                                                </span>
                                            </label>
                                        @endforeach
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 pt-4">
                        <a href="{{ route('roles.index') }}" class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5">
                            Cancel
                        </a>
                        <button type="submit" class="inline-flex items-center justify-center rounded-lg bg-brand-500 px-10 py-2.5 text-center font-medium text-white hover:bg-opacity-90 transition-all">
                            Save Role
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
