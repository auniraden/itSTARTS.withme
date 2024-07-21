<<?php
namespace App\Http\Controllers;

use App\Services\GoogleClassroomService;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    protected $googleClassroom;

    public function __construct(GoogleClassroomService $googleClassroom)
    {
        $this->googleClassroom = $googleClassroom;
    }

    public function authenticate(Request $request)
    {
        $this->googleClassroom->authenticate($request->input('code'));
        return redirect()->route('tasks.index');
    }

    public function tasks()
    {
        $tasks = $this->googleClassroom->getTasks();
        return response()->json($tasks);
    }
}
