const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler to the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    // Stores the triggered events
    window.deferredPrompt = event;

    //Removes the hidden class from the button. 
    butInstall.classList.toggle('hidden', false);
});


butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, which can only be used once. 
    window.deferredPrompt = null;

    // Removes hidden class
    butInstall.classList.toggle('hidden', true);
});

//Event handler for the 'appinstalled' event 
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    window.deferredPrompt = null;
});
