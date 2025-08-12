import { useState } from 'react';

export const useDisclosure = ({
  defaultOpen = null,
  allowMultiple = false,
} = {}) => {
  const [openItems, setOpenItems] = useState(() => {
    if (defaultOpen) {
      return { [defaultOpen]: true };
    }
    return {};
  });

  const toggle = (itemId) => {
    setOpenItems((prev) => {
      const wasOpen = prev[itemId];

      if (allowMultiple) {
        return {
          ...prev,
          [itemId]: !wasOpen,
        };
      } else {
        if (wasOpen) {
          return {};
        } else {
          return { [itemId]: true };
        }
      }
    });
  };

  const open = (itemId) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return {
          ...prev,
          [itemId]: true,
        };
      } else {
        return { [itemId]: true };
      }
    });
  };

  const close = (itemId) => {
    setOpenItems((prev) => {
      const newState = { ...prev };
      delete newState[itemId];
      return newState;
    });
  };

  const closeAll = () => {
    setOpenItems({});
  };

  const isOpen = (itemId) => Boolean(openItems[itemId]);

  return {
    openItems,
    toggle,
    open,
    close,
    closeAll,
    isOpen,
  };
};
