function canAccessTop() {
    try {
        return !!window.top.document;
    } catch (e) {
        return false;
    }
}

export default canAccessTop() ? window.top : window;

