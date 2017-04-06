<?php
/**
 * Created by PhpStorm.
 * User: kimr234z
 * Date: 4/5/17
 * Time: 4:32 PM
 */

namespace AppBundle\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    /**
     * @Assert\File(maxSize="6000000")
     */
    protected $file;
    protected $uploadDir;
    protected $hashedFileName;

    /**
     * Constructor
     *
     * @param $uploadDir
     */
    public function __construct($uploadDir)
    {
        $this->uploadDir = $uploadDir;
    }

    /**
     * Sets file.
     *
     * @param UploadedFile $file
     */
    public function setFile(UploadedFile $file = null)
    {
        $this->file           = $file;
        $this->hashedFileName = md5(uniqid()) . '.' . $this->file->guessExtension();

        // Check if we have an old image path
        if (isset($this->path)) {
            // Store the old name to delete after the update
            $this->temp = $this->path;
            $this->path = null;
        } else {
            $this->path = 'initial';
        }
    }

    /**
     * Get file.
     *
     * @return UploadedFile
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Get absolute path
     *
     * @return null|string
     */
    public function getAbsolutePath()
    {
        return null === $this->path
            ? null
            : $this->getUploadRootDir() . '/' . $this->path;
    }

    /**
     * Get web path
     *
     * @return null|string
     */
    public function getWebPath()
    {
        return null === $this->path
            ? null
            : $this->getUploadDir().'/' . $this->path;
    }

    /**
     * Get full path of upload directory
     *
     * @return string
     */
    protected function getUploadRootDir()
    {
        return __DIR__ . '/../../../web' . $this->getUploadDir();
    }

    /**
     * Set target directory
     *
     * @param $dir
     */
    public function setCustomUploadDir($dir)
    {
        $this->uploadDir = $dir;
    }

    /**
     * Get target directory
     *
     * @return mixed
     */
    protected function getUploadDir()
    {
        return $this->uploadDir;
    }

    /**
     * Get asset full path with file name
     *
     * @return bool|string
     */
    private function getAssetFullPath()
    {
        if (null === $this->hashedFileName) {
            return false;
        }

        return $this->getUploadDir() . DIRECTORY_SEPARATOR . $this->hashedFileName;
    }

    /**
     * Pre uploader
     *
     * @return bool|void
     */
    public function preUpload()
    {
        if (null === $this->file) {
            return;
        }

        if ($this->path != $this->file->getClientOriginalName()) {
            $this->path = $this->file->getClientOriginalName();
        }

        return true;
    }

    /**
     * Actual uploader
     *
     * @return bool|string
     */
    private function _upload()
    {
        if (null === $this->file || null === $this->hashedFileName) {
            return false;
        }

        if (!is_dir($this->getUploadRootDir())) {
            mkdir($this->getUploadRootDir(), 0775, true);
        }

        $this->file->move($this->getUploadRootDir(), $this->hashedFileName);

        return $this->getAssetFullPath();
    }

    /**
     * Upload image
     *
     * @param $file
     * @return bool|string
     */
    public function upload($file)
    {
        $this->setFile($file);
        $results = $this->_upload();

        return $results;
    }

    public function removeCurrentAsset($file)
    {

    }
}