<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'        => 'required|max:64|unique:products,name,NULL,id,deleted_at,NULL',
            'description' => 'required',
            'image'       => 'sometimes|image:jpeg,png,jpg',
            'category'    => 'required|exists:categories,id',
            'price'       => 'required|numeric'
        ];
    }
}
