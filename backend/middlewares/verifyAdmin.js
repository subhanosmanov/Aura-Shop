const verifyAdmin = (req, res, next) => {
  try {
    // req.user obyekti əvvəlki verifyToken middleware-i tərəfindən doldurulmuş olmalıdır
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Avtorizasiya xətası: İstifadəçi tapılmadı.' 
      });
    }

    // İstifadəçinin rolunun 'admin' olub-olmadığını yoxlayırıq
    // (Əgər bazada rol sahəsi 'role: "admin"' şəklindədirsə)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'İcazə rədd edildi: Bu əməliyyat üçün yalnız admin səlahiyyəti tələb olunur.' 
      });
    }

    // Əgər hər şey qaydasındadırsa, növbəti addıma (controller-ə) keçir
    next();
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Server xətası baş verdi.', 
      error: error.message 
    });
  }
};

module.exports = { verifyAdmin };