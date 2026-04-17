import { useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Camera, Upload, X } from 'lucide-react';

export default function PhotoCapture() {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async () => {
    if (!photo) return;
    setUploading(true);

    const fileName = `photo_${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from('treatment-photos')
      .upload(fileName, photo);

    setUploading(false);

    if (error) {
      alert('Lỗi upload: ' + error.message);
    } else {
      alert('✅ Đã upload ảnh thành công!');
      setPhoto(null);
      setPreview(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
        <Camera className="w-8 h-8" />
        Chụp ảnh trước / sau trị liệu
      </h1>

      <div className="bg-white rounded-3xl shadow p-8 text-center">
        {preview ? (
          <div>
            <img src={preview} alt="Preview" className="mx-auto rounded-3xl max-h-96 object-cover shadow" />
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => { setPhoto(null); setPreview(null); }}
                className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-600 rounded-3xl"
              >
                <X className="w-5 h-5" />
                Chụp lại
              </button>
              <button
                onClick={uploadPhoto}
                disabled={uploading}
                className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-3xl"
              >
                <Upload className="w-5 h-5" />
                {uploading ? 'Đang upload...' : 'Upload lên hồ sơ'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-32 h-32 mx-auto bg-purple-100 rounded-3xl flex items-center justify-center mb-6">
              <Camera className="w-16 h-16 text-purple-500" />
            </div>
            <p className="text-xl font-medium text-gray-700 mb-2">Chụp ảnh ngay</p>
            <p className="text-gray-400 mb-8">Để theo dõi tiến triển trị liệu</p>
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-purple-600 text-white px-10 py-4 rounded-3xl flex items-center gap-3 mx-auto"
            >
              <Camera className="w-6 h-6" />
              Mở camera
            </button>
            <input
type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleCapture}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}