import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyBottomBar = ({ onCall, onWhatsApp, onGetQuote, vendor }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-pb">
      <div className="px-4 py-3">
        <div className="flex items-center space-x-3">
          {/* Call Button */}
          <button
            onClick={onCall}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors font-medium"
          >
            <Icon name="Phone" size={18} />
            <span className="text-sm">Call</span>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={onWhatsApp}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-success hover:bg-success/90 text-success-foreground rounded-lg transition-colors font-medium"
          >
            <Icon name="MessageCircle" size={18} />
            <span className="text-sm">WhatsApp</span>
          </button>

          {/* Get Quote Button */}
          <button
            onClick={onGetQuote}
            className="flex-[2] flex items-center justify-center space-x-2 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
          >
            <Icon name="MessageSquare" size={18} />
            <span className="text-sm">Get Quote</span>
          </button>
        </div>

        {/* Vendor Info */}
        <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} className="mr-1" />
          <span>Responds in {vendor?.responseTime}</span>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;