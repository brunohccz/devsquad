<?php

namespace App\Console\Commands;

use App\File;
use App\Notifications\ProductsImported;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class ProductsImport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import products from csv file';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $files = File::whereNull('processed')->get();

        foreach($files as $file) {
            $this->info("Importing file {$file->name}");

            $import = new \App\Imports\ProductsImport();
            Excel::import($import, $file->path, config('filesystems.default'));

            $file->wasProcessed();
            $file->user->notify(new ProductsImported($file->name, $import->getRowCount()));

            $this->info("imported {$import->getRowCount()} rows");
        }
    }
}
