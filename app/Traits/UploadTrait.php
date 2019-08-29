<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait UploadTrait
{
    /**
     * @param UploadedFile $uploadedFile
     * @param null $folder
     * @param null $disk
     * @return false|string
     */
    public function fileUpload(UploadedFile $uploadedFile, $folder = null, $disk = null)
    {
        $name = Str::random(30) . '.' . $uploadedFile->getClientOriginalExtension();

        $path = $uploadedFile->storeAs($folder, $name, [
            'disk' => $disk ?? config('filesystems.default'),
            'visibility' => 'public'
        ]);

        return Storage::disk(config('filesystems.default'))->url($path);
    }

    /**
     * @param $path
     * @param null $disk
     * @return bool
     */
    public function fileDelete($path, $disk = null)
    {
        $disk = $disk ?? config('filesystems.default');

        if($disk === 'local' || $disk === 'public') {
            return File::delete(public_path($path));
        }

        return Storage::disk($disk ?? config('filesystems.default'))->delete($path);
    }
}
