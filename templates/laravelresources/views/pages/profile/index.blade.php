@extends('layouts.app')

@section('content')
    <div class="space-y-6">
        <x-common.page-breadcrumb pageTitle="My Profile" />

        @if(session('success'))
            <x-ui.alert variant="success" message="{{ session('success') }}" />
        @endif

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <!-- Left Column: Profile Card -->
            <div class="space-y-6">
                <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <div class="flex flex-col items-center">
                        <div class="relative w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-3xl font-bold mb-4">
                            {{ collect(explode(' ', $user->name))->map(fn($n) => mb_substr($n, 0, 1))->take(2)->join('') }}
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white/90">{{ $user->name }}</h3>
                        <p class="text-sm text-gray-500">{{ $user->position->name ?? 'No Position' }}</p>
                        
                        <div class="w-full mt-6 space-y-3">
                            <div class="flex items-center gap-3 text-sm">
                                <i data-lucide="mail" class="w-4 h-4 text-gray-400"></i>
                                <span class="text-gray-600 dark:text-gray-400">{{ $user->email }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-sm">
                                <i data-lucide="phone" class="w-4 h-4 text-gray-400"></i>
                                <span class="text-gray-600 dark:text-gray-400">{{ $user->phone ?? '-' }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-sm">
                                <i data-lucide="building" class="w-4 h-4 text-gray-400"></i>
                                <span class="text-gray-600 dark:text-gray-400">{{ $user->department->name ?? '-' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Edit Profile -->
            <div class="lg:col-span-2">
                <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">Edit Profile</h4>
                    
                    <form action="{{ route('profile.update') }}" method="POST" class="space-y-5">
                        @csrf
                        @method('PUT')

                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Full Name</label>
                                <input type="text" name="name" value="{{ old('name', $user->name) }}" required
                                    class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                                @error('name') <p class="mt-1 text-xs text-error-500">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Email Address</label>
                                <input type="email" name="email" value="{{ old('email', $user->email) }}" required
                                    class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                                @error('email') <p class="mt-1 text-xs text-error-500">{{ $message }}</p> @enderror
                            </div>

                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Phone</label>
                                <input type="text" name="phone" value="{{ old('phone', $user->phone) }}"
                                    class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                            </div>

                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Company</label>
                                <select name="company_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                                    <option value="">Select Company</option>
                                    @foreach($companies as $company)
                                        <option value="{{ $company->id }}" {{ old('company_id', $user->company_id) == $company->id ? 'selected' : '' }}>{{ $company->name }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Department</label>
                                <select name="department_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                                    <option value="">Select Department</option>
                                    @foreach($departments as $dept)
                                        <option value="{{ $dept->id }}" {{ old('department_id', $user->department_id) == $dept->id ? 'selected' : '' }}>{{ $dept->name }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Location</label>
                                <select name="location_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                                    <option value="">Select Location</option>
                                    @foreach($locations as $loc)
                                        <option value="{{ $loc->id }}" {{ old('location_id', $user->location_id) == $loc->id ? 'selected' : '' }}>{{ $loc->name }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Position</label>
                                <select name="position_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                                    <option value="">Select Position</option>
                                    @foreach($positions as $pos)
                                        <option value="{{ $pos->id }}" {{ old('position_id', $user->position_id) == $pos->id ? 'selected' : '' }}>{{ $pos->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <hr class="border-gray-100 dark:border-gray-800">

                        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">New Password (Optional)</label>
                                <input type="password" name="password"
                                    class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                            </div>
                            <div>
                                <label class="mb-2.5 block font-medium text-gray-700 dark:text-gray-400">Confirm New Password</label>
                                <input type="password" name="password_confirmation"
                                    class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                            </div>
                        </div>

                        <div class="flex justify-end pt-3">
                            <button type="submit" class="inline-flex items-center justify-center rounded-lg bg-brand-500 px-10 py-3.5 text-center font-medium text-white hover:bg-opacity-90">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
