import { useState } from 'react';
import '../styles/auth.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [mesaj, setMesaj] = useState('');

  // Form değişikliklerini yakala
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Kayıt olma
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMesaj('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          department: formData.department
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMesaj('Kayıt başarılı! Giriş yapabilirsiniz.');
        setFormData({ email: '', password: '', username: '', department: '' });
        setTimeout(() => setIsLogin(true), 2000);
      } else {
        setMesaj('Hata: ' + data.hata);
      }
    } catch (error) {
      setMesaj('Bağlantı hatası: ' + error.message);
    }

    setLoading(false);
  };

  // Giriş yapma
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMesaj('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Token'i localStorage'a kaydet
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.kullanici));
        setMesaj('Giriş başarılı!');
        // 2 saniye sonra dashboard'a yönlendir
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setMesaj('Hata: ' + data.hata);
      }
    } catch (error) {
      setMesaj('Bağlantı hatası: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</h1>

        {mesaj && <div className={`mesaj ${mesaj.includes('başarılı') ? 'basarili' : 'hata'}`}>{mesaj}</div>}

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {/* Kayıt olurken username göster */}
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Kayıt olurken bölüm seç */}
          {!isLogin && (
            <div className="form-group">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Bölüm Seç</option>
                <option value="Havacılık">Havacılık</option>
                <option value="Haberleşme">Haberleşme</option>
                <option value="Yazılım">Yazılım</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Bekleniyor...' : isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Hesabın yok mu? " : "Zaten hesabın var mı? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setMesaj('');
            }}
            className="toggle-btn"
          >
            {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </div>
    </div>
  );
}