<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Http\Requests\CompanyRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Notifications\NewCompanyNotification;
use Illuminate\Support\Facades\Notification;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return Company::paginate(4);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->isMethod('post')) {
            $company_data = $request->input();

            // set validations
            $rules = [
                'name' =>   'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:companies',
                'website' => 'nullable|string|url|max:255',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ];

            $validator = Validator::make($company_data, $rules);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            // upload logo
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('public/logos');
                // Remove 'public/' from the path and generate a public URL
                $company_data['logo'] = asset(str_replace('public/', '', $logoPath));
            }

            // save data in db
            $company = Company::create($company_data);
            //dd($company);

            // Send the notification
            Notification::route('mail', config('mail.from.address'))
            ->notify(new NewCompanyNotification($company));
            return response()->json(['status' => true, 'message' => 'Company registered successfully'], 201);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['status' => false, 'message' => 'Company not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $company], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    if ($request->isMethod('PUT')) {
        $company_data = $request->input();
        //dd($company_data);
        $company = Company::find($id);
        if (!$company) {
            return response()->json(['status' => false, 'message' => 'Company not found'], 404);
        }

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:companies,email,' . $company->id,
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'website' => 'nullable|string|url|max:255',
        ];

        $validator = Validator::make($company_data, $rules);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('public/logos');
            $company_data['logo'] = Storage::url($logoPath);
        }

        $company->update($company_data);

        return response()->json(['status' => true, 'message' => 'Company updated successfully'], 202);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['status' => false, 'message' => 'Company not found'], 404);
        }

        $company->delete();

        return response()->json(['status' => true, 'message' => 'Company deleted successfully'], 200);
    }
}
