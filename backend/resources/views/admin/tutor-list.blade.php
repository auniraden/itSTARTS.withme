@extends('layouts.app')

@section('content')
    <h1>Pending Tutor Approvals</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tutors as $tutor)
                <tr>
                    <td>{{ $tutor->first_name }} {{ $tutor->last_name }}</td>
                    <td>{{ $tutor->email }}</td>
                    <td>
                        <a href="{{ route('admin.tutor.details', $tutor->id) }}" class="btn btn-primary">View Details</a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
