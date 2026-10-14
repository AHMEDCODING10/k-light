export function initNavigation() {
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileItems = document.querySelectorAll('.mobile-item');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileNavToggle && mobileDrawer) {
    mobileNavToggle.addEventListener('click', openDrawer);
    mobileDrawerClose.addEventListener('click', closeDrawer);
    drawerBackdrop.addEventListener('click', closeDrawer);
    mobileItems.forEach(item => item.addEventListener('click', closeDrawer));
  }
}

