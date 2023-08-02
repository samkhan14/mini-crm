<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Employee::paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if ($request->isMethod('post')) {
            $userdata = $request->input();
            //dd($userdata);

            $rules = [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'company_id' => 'required|exists:companies,id',
                'email' => 'nullable|email',
                'phone' => 'nullable|string',
            ];

            $validator = Validator::make($userdata, $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            Employee::create($userdata);
            return response()->json(['status' => true, 'message' => 'Employee Added successfully'], 201);
            //}

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json(['status' => false, 'message' => 'Employee not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $employee], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if ($request->isMethod('PUT')) {
            $userdata = $request->input();
            //dd($userdata);
            $employee = Employee::find($id);
            if (!$employee) {
                return response()->json(['status' => false, 'message' => 'Employee not found'], 404);
            }

            $rules = [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'company_id' => 'required|exists:companies,id',
                'email' => 'nullable|email',
                'phone' => 'nullable|string',
            ];

            $validator = Validator::make($userdata, $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $employee->update($userdata);

            return response()->json(['status' => true, 'message' => 'Employee updated successfully'], 202);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(null, 204);
    }
}
