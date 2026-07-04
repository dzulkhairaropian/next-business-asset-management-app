@extends('layouts.app')

@section('content')
    <div class="space-y-6">
        <x-common.page-breadcrumb pageTitle="Edit User" />

        <div class="max-w-3xl mx-auto">
            <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-8">
                <form action="{{ route('users.update', $user) }}" method="POST" class="space-y-6">
                    @csrf
                    @method('PUT')

                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <!-- Name -->
                        <div class="sm:col-span-2">
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Full Name</label>
                            <input type="text" name="name" value="{{ old('name', $user->name) }}" required
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                            @error('name') <p class="mt-1 text-xs text-error-500">{{ $message }}</p> @enderror
                        </div>

                        <!-- Email -->
                        <div class="sm:col-span-2">
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Email Address</label>
                            <input type="email" name="email" value="{{ old('email', $user->email) }}" required
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                            @error('email') <p class="mt-1 text-xs text-error-500">{{ $message }}</p> @enderror
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">New Password (Optional)</label>
                            <input type="password" name="password"
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                            @error('password') <p class="mt-1 text-xs text-error-500">{{ $message }}</p> @enderror
                        </div>

                        <!-- Confirm Password -->
                        <div>
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Confirm New Password</label>
                            <input type="password" name="password_confirmation"
                                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5">
                        </div>

                        <hr class="sm:col-span-2 border-gray-100 dark:border-gray-800">

                        <!-- Roles -->
                        <div class="sm:col-span-2">
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Assign Roles</label>
                            <div class="flex flex-wrap gap-4">
                                @foreach($roles as $role)
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" name="roles[]" value="{{ $role->id }}" 
                                            {{ in_array($role->id, old('roles', $userRoles)) ? 'checked' : '' }}
                                            class="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ $role->name }}</span>
                                    </label>
                                @endforeach
                            </div>
                            @error('roles') <p class="mt-1 text-xs text-error-500">{{ $message }}</p> @enderror
                        </div>

                        <!-- Company -->
                        <div>
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Company</label>
                            <select name="company_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-[size:1.5em_1.5em] bg-no-repeat">
                                <option value="">Select Company</option>
                                @foreach($companies as $company)
                                    <option value="{{ $company->id }}" {{ old('company_id', $user->company_id) == $company->id ? 'selected' : '' }}>{{ $company->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Department -->
                        <div>
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Department</label>
                            <select name="department_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-[size:1.5em_1.5em] bg-no-repeat">
                                <option value="">Select Department</option>
                                @foreach($departments as $dept)
                                    <option value="{{ $dept->id }}" {{ old('department_id', $user->department_id) == $dept->id ? 'selected' : '' }}>{{ $dept->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Location -->
                        <div>
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Location</label>
                            <select name="location_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-[size:1.5em_1.5em] bg-no-repeat">
                                <option value="">Select Location</option>
                                @foreach($locations as $loc)
                                    <option value="{{ $loc->id }}" {{ old('location_id', $user->location_id) == $loc->id ? 'selected' : '' }}>{{ $loc->name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Position -->
                        <div>
                            <label class="mb-2.5 block font-medium text-gray-800 dark:text-white/90">Position</label>
                            <select name="position_id" class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-white/5 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-[size:1.5em_1.5em] bg-no-repeat">
                                <option value="">Select Position</option>
                                @foreach($positions as $pos)
                                    <option value="{{ $pos->id }}" {{ old('position_id', $user->position_id) == $pos->id ? 'selected' : '' }}>{{ $pos->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-3 pt-4">
                        <a href="{{ route('users.index') }}" class="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/5">
                            Cancel
                        </a>
                        <button type="submit" class="inline-flex items-center justify-center rounded-lg bg-brand-500 px-10 py-2.5 text-center font-medium text-white hover:bg-opacity-90 transition-all">
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
