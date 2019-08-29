<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Product;
use App\Traits\UploadTrait;

class ProductController extends Controller
{
    use UploadTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::orderBy('name')->paginate(10);

        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductStoreRequest $request)
    {
        $product = Product::create([
            'name'        => $request->name,
            'image'       => !is_null($request->image) ? $this->fileUpload($request->file('image'), 'public/products') : null,
            'description' => $request->description,
            'category'    => $request->category,
            'price'       => $request->price,
        ]);

        return response()->json($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductUpdateRequest $request
     * @param \App\Product $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProductUpdateRequest $request, Product $product)
    {
        $product->update([
            'name'        => $request->name,
            'image'       => !is_null($request->image) ? $this->fileUpload($request->file('image'), 'public/products') : $product->image,
            'description' => $request->description ?? $product->description,
            'category'    => $request->category,
            'price'       => $request->price,
        ]);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Product $product
     * @return void
     * @throws \Exception
     */
    public function destroy(Product $product)
    {
        if ($product->image !== null) {
            $imageUrl = parse_url($product->image);

            $this->fileDelete($imageUrl['path']);
        }

        $product->delete();
    }
}
