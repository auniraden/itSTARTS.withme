@extends('layouts.app')

@section('content')
    <h1>Tutor Details</h1>
    <div>
        <p><strong>Name:</strong> {{ $tutor->first_name }} {{ $tutor->last_name }}</p>
        <p><strong>Email:</strong> {{ $tutor->email }}</p>
        <p><strong>Subjects:</strong> {{ implode(', ', $tutor->tutorSubjects->pluck('subject.name')->toArray()) }}</p>
        <p><strong>Qualifications:</strong></p>
        <ul>
            @foreach($tutor->qualifications as $qualification)
                <li><a href="{{ asset('storage/' . $qualification->file_path) }}" target="_blank">View Qualification</a></li>
            @endforeach
        </ul>
    </div>

    <form action="{{ route('admin.tutor.approve', $tutor->id) }}" method="POST">
        @csrf
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="subject_approved" id="subject_approved">
            <label class="form-check-label" for="subject_approved">
                Subjects Approved
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="qualification_approved" id="qualification_approved">
            <label class="form-check-label" for="qualification_approved">
                Qualifications Approved
            </label>
        </div>
        <button type="submit" class="btn btn-success">Approve Tutor</button>
    </form>

    <form action="{{ route('admin.tutor.disapprove', $tutor->id) }}" method="POST" class="mt-3">
        @csrf
        <button type="submit" class="btn btn-danger">Disapprove Tutor</button>
    </form>
@endsection
