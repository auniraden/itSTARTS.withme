@extends('layouts.app')

@section('content')
<div class="container">
    <div class="alert alert-success" role="alert">
        A fresh verification link has been sent to your email address.
    </div>

    Before proceeding, please check your email for a verification link.
    If you did not receive the email, <a href="{{ route('verification.resend') }}">click here to request another</a>.
</div>
@endsection
