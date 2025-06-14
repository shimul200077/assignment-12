import platform from "platform";

let tabTimes = {};
let currentTab = document.title || "Unknown Tab";
let startTime = Date.now();

function updateTabTime() {
    const now = Date.now();
    if (!tabTimes[currentTab]) {
        tabTimes[currentTab] = 0;
    }
    tabTimes[currentTab] += now - startTime;
    startTime = now;
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        updateTabTime();
    } else {
        startTime = Date.now();
        currentTab = document.title || "Unknown Tab";
    }
});

window.addEventListener("beforeunload", () => {
    updateTabTime();
});

async function getUserPreciseLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                },
                (error) => {
                    reject("User denied location access or location unavailable.");
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

async function getCityFromCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();

        console.log("Reverse Geocoding Response:", data);

        if (data && data.address) {
            return {
                city: data.address.city || data.address.town || data.address.village || "Unknown",
                region: data.address.state || "Unknown",
                country: data.address.country || "Unknown",
            };
        }
        return { city: "Unknown", region: "Unknown", country: "Unknown" };
    } catch (error) {
        console.error("Error fetching city from coordinates:", error);
        return { city: "Unknown", region: "Unknown", country: "Unknown" };
    }
}

async function getIPv4() {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip || "Unknown IPv4";
    } catch (error) {
        console.error("Error fetching IPv4 address:", error);
        return "Unknown IPv4";
    }
}

async function getIPv6() {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip || "Unknown IPv6";
    } catch (error) {
        console.error("Error fetching IPv6 address:", error);
        return "Unknown IPv6";
    }
}

function getCurrentDateTime() {
    return new Date().toISOString();
}

function getOSInfo() {
    return {
        osName: platform.os?.family || "Unknown OS",
        osVersion: platform.os?.version || "Unknown Version",
    };
}

let hasRun = false;

export async function collectUserInfo() {
    if (hasRun) return;
    hasRun = true;

    let preciseLocation = null;
    let cityData = { city: "Unknown", region: "Unknown", country: "Unknown" };
    let ipv4 = "Unknown IPv4";
    let ipv6 = "Unknown IPv6";

    try {
        preciseLocation = await getUserPreciseLocation();
        cityData = await getCityFromCoordinates(preciseLocation.latitude, preciseLocation.longitude);
        ipv4 = await getIPv4();
        ipv6 = await getIPv6();
    } catch (error) {
        console.error("Error collecting user info:", error);
    }

    const osInfo = getOSInfo();
    const dateTime = getCurrentDateTime();

    return {
        ip: {
            ipv4,
            ipv6
        },
        os: osInfo,
        location: {
            city: cityData.city,
            region: cityData.region,
            country: cityData.country,
            precise_coordinates: preciseLocation || "Unknown",
        },
        dateTime,
    };
}
