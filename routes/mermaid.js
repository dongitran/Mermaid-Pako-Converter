const express = require('express');
const router = express.Router();
const { mermaidCodeToHash, mermaidCodeToUrl } = require('../utils/mermaidUtils');

/**
 * @route POST /api/convert
 * @desc Convert Mermaid code to compressed Pako string
 * @access Public
 */
router.post('/convert', (req, res) => {
  try {
    const { mermaidCode } = req.body;
    
    if (!mermaidCode) {
      return res.status(400).json({ 
        success: false, 
        error: 'Mermaid code is required in request body' 
      });
    }
    
    const hash = mermaidCodeToHash(mermaidCode);
    const url = mermaidCodeToUrl(hash);
    
    return res.status(200).json({
      success: true,
      hash,
      url
    });
  } catch (error) {
    console.error('Error compressing Mermaid code:', error);
    return res.status(500).json({
      success: false,
      error: 'Error compressing Mermaid code'
    });
  }
});

module.exports = router;
