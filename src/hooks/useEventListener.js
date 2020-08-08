import { useRef, useEffect } from "react";

/**
 * Sets and removes event listeners
 *
 * @param {string} event          - A string which represents the event to listen
 * @param {Function} callback     - The callback function for the event listener
 * @param {HTMLElement} [element] - Target element (window by default)
 */
const useEventListener = (event, callback, element = window) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const supportsEventListener = element && element.addEventListener;
        if (!supportsEventListener) return;

        const eventListener = event => savedCallback.current(event);
        element.addEventListener(event, eventListener);
        return () => element.removeEventListener(event, eventListener);
    }, [event, element]);
};

export default useEventListener;
