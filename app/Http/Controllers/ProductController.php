<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductImportRequest;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductResourceCollection;
use App\Product;
use App\Traits\UploadTrait;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use UploadTrait;

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return ProductResourceCollection
     */
    public function index(Request $request)
    {
        $products = Product::where("name", "LIKE", "%{$request->query('search')}%")->orderBy('name')->paginate(10);

        return new ProductResourceCollection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductStoreRequest $request
     * @return ProductResource
     */
    public function store(ProductStoreRequest $request)
    {
        $product = Product::create([
            'name'        => $request->name,
            'image'       => !is_null($request->image) ? $this->fileUpload($request->file('image'), 'public/products') : null,
            'description' => $request->description,
            'category_id'    => $request->category,
            'price'       => $request->price,
        ]);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return ProductResource
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductUpdateRequest $request
     * @param \App\Product $product
     * @return ProductResource
     */
    public function update(ProductUpdateRequest $request, Product $product)
    {
        $product->update([
            'name'        => $request->name,
            'image'       => !is_null($request->image) ? $this->fileUpload($request->file('image'), 'public/products') : $product->image,
            'description' => $request->description ?? $product->description,
            'category_id'    => $request->category,
            'price'       => $request->price,
        ]);

        return new ProductResource($product);
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

    /**
     * Import csv document
     *
     * @param ProductImportRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function import(ProductImportRequest $request)
    {
        $request->user()->files()->create([
            'name' => $request->file('csv')->getClientOriginalName(),
            'path' => $this->fileUpload($request->file('csv'), 'csv', 'private')
        ]);

        return response()->json(['status' => 'success', 'msg' => 'We are processing the file, please wait for confirmation email']);
    }
}
