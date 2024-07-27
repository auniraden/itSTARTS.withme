@extends('layouts.app')

@section('content')
    <div class="container">
        <h2>Admin Dashboard</h2>
        <p>Welcome, {{ Auth::user()->name }}!</p>
        <a href="{{ route('admin.tutors') }}" class="btn btn-primary">Manage Tutors</a>
        <form action="{{ route('admin.logout') }}" method="POST" style="display:inline;">
            @csrf
            <button type="submit" class="btn btn-secondary">Logout</button>
        </form>
    </div>
@endsection
