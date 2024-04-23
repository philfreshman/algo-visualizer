interface IconProps {
  className?: string
}

export const AlienIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" version="1.1">
      <path
        d="M 10 7.799 C 10 8.239, 11.575 8.415, 13.500 8.190 C 15.425 7.965, 17 7.605, 17 7.391 C 17 7.176, 15.425 7, 13.500 7 C 11.575 7, 10 7.360, 10 7.799 M 40.015 8.750 C 40.025 9.914, 40.282 10.105, 40.782 9.319 C 41.195 8.669, 43.550 7.960, 46.016 7.744 L 50.500 7.349 45.250 7.175 C 40.845 7.028, 40.002 7.282, 40.015 8.750 M 13 12.073 C 13 13.504, 13.539 14.043, 14.739 13.812 C 17.345 13.310, 17.636 10, 15.073 10 C 13.642 10, 13 10.642, 13 12.073 M 43.500 11 C 42.663 12.354, 43.792 14, 45.559 14 C 46.352 14, 47 13.100, 47 12 C 47 9.930, 44.587 9.240, 43.500 11 M 7.195 15.500 C 7.215 17.150, 7.439 17.704, 7.693 16.731 C 7.947 15.758, 7.930 14.408, 7.656 13.731 C 7.382 13.054, 7.175 13.850, 7.195 15.500 M 21.500 14 C 21.160 14.550, 21.179 15.480, 21.541 16.067 C 21.904 16.654, 20.131 19.034, 17.600 21.357 C 13.690 24.948, 13 26.148, 13 29.360 C 13 32.707, 12.743 33.103, 10.750 32.820 C 8.742 32.534, 8.490 31.908, 8.405 27 C 8.335 22.989, 7.929 21.500, 6.905 21.500 C 5.896 21.500, 5.415 23.121, 5.200 27.250 C 4.966 31.732, 5.218 33, 6.343 33 C 7.137 33, 8.056 33.704, 8.386 34.564 C 8.744 35.498, 9.896 36.001, 11.243 35.814 C 13.057 35.562, 13.562 36.040, 13.816 38.250 C 14.065 40.410, 14.655 41, 16.566 41 C 18.496 41, 19 41.518, 19 43.500 C 19 45.611, 19.467 46, 22 46 C 24.533 46, 25 45.611, 25 43.500 C 25 41.167, 25.333 41, 30 41 C 34.915 41, 35.688 41.642, 35.118 45.250 C 35.053 45.662, 36.350 46, 38 46 C 40.511 46, 41 45.604, 41 43.566 C 41 41.655, 41.590 41.065, 43.750 40.816 C 45.936 40.565, 46.567 39.916, 46.826 37.653 C 47.087 35.370, 47.544 34.909, 49.137 35.326 C 50.321 35.635, 51.343 35.271, 51.668 34.422 C 51.968 33.640, 52.841 33, 53.607 33 C 54.643 33, 55 31.462, 55 27 C 55 22.425, 54.656 21, 53.550 21 C 52.486 21, 52.020 22.531, 51.800 26.750 C 51.534 31.844, 51.243 32.536, 49.250 32.820 C 47.198 33.111, 47 32.736, 47 28.570 C 47 25.174, 46.614 24, 45.500 24 C 44.675 24, 44 23.325, 44 22.500 C 44 21.675, 43.518 21, 42.929 21 C 41.020 21, 39 18.208, 39 15.571 C 39 13.667, 38.481 13, 37 13 C 35.444 13, 35 13.667, 35 16 C 35 18.933, 34.889 19, 30 19 C 25.111 19, 25 18.933, 25 16 C 25 13.032, 22.855 11.807, 21.500 14 M 28.750 15.662 C 29.438 15.940, 30.563 15.940, 31.250 15.662 C 31.938 15.385, 31.375 15.158, 30 15.158 C 28.625 15.158, 28.063 15.385, 28.750 15.662 M 10.184 18.741 C 10.526 21.705, 14 23.373, 14 20.573 C 14 19.708, 14.675 19, 15.500 19 C 16.325 19, 17 18.325, 17 17.500 C 17 16.447, 15.937 16, 13.434 16 C 10.135 16, 9.891 16.206, 10.184 18.741 M 43.496 17.007 C 43.153 17.561, 43.577 18.284, 44.437 18.614 C 45.296 18.944, 46 19.841, 46 20.607 C 46 21.373, 46.900 22, 48 22 C 49.556 22, 50 21.333, 50 19 C 50 16.347, 49.660 16, 47.059 16 C 45.441 16, 43.838 16.453, 43.496 17.007 M 19.667 27.667 C 19.300 28.033, 19 29.833, 19 31.667 C 19 34.556, 19.333 35, 21.500 35 C 23.750 35, 24 34.600, 24 31 C 24 27.788, 23.639 27, 22.167 27 C 21.158 27, 20.033 27.300, 19.667 27.667 M 36 30.930 C 36 34.630, 36.233 35, 38.560 35 C 40.908 35, 41.095 34.688, 40.810 31.250 C 40.561 28.238, 40.057 27.437, 38.250 27.180 C 36.233 26.894, 36 27.282, 36 30.930 M 14 51.500 C 14 52.325, 14.450 53, 15 53 C 15.550 53, 16 52.325, 16 51.500 C 16 50.675, 15.550 50, 15 50 C 14.450 50, 14 50.675, 14 51.500 M 44 51.583 C 44 53.349, 46.153 53.042, 46.771 51.188 C 46.989 50.534, 46.454 50, 45.583 50 C 44.712 50, 44 50.712, 44 51.583"
        stroke="none"
        fill="#8563b3"
        fillRule="evenodd"
      />
      <path
        d="M 14 7.882 C 11.366 8.347, 10.421 9.057, 10.180 10.750 C 10.005 11.988, 9.442 13, 8.930 13 C 8.419 13, 8 14.125, 8 15.500 C 8 17.611, 7.533 18, 5 18 L 2 18 2 27 C 2 34.333, 2.278 36, 3.500 36 C 4.325 36, 5 36.675, 5 37.500 C 5 38.325, 5.419 39, 5.930 39 C 6.442 39, 7.005 40.013, 7.180 41.250 C 7.446 43.123, 8.216 43.552, 11.773 43.809 C 16.193 44.128, 16.764 46, 12.441 46 C 10.215 46, 10 46.396, 10 50.500 L 10 55 15 55 C 19.667 55, 20 54.833, 20 52.500 C 20 50.250, 20.400 50, 24 50 C 27.778 50, 28 49.833, 28 47 C 28 44.667, 28.444 44, 30 44 C 31.556 44, 32 44.667, 32 47 C 32 49.833, 32.222 50, 36 50 C 39.600 50, 40 50.250, 40 52.500 C 40 54.833, 40.333 55, 45 55 L 50 55 50 50.500 C 50 46.396, 49.785 46, 47.559 46 C 43.236 46, 43.807 44.128, 48.227 43.809 C 51.784 43.552, 52.554 43.123, 52.820 41.250 C 52.995 40.013, 53.558 39, 54.070 39 C 54.581 39, 55 38.325, 55 37.500 C 55 36.675, 55.675 36, 56.500 36 C 57.722 36, 58 34.333, 58 27 C 58 18.067, 57.981 18, 55.500 18 C 53.500 18, 53 17.500, 53 15.500 C 53 13.944, 52.433 13, 51.500 13 C 50.567 13, 50 12.056, 50 10.500 C 50 8.204, 49.633 8, 45.500 8 C 43.025 8, 41 8.450, 41 9 C 41 9.550, 38.975 10, 36.500 10 C 32.167 10, 32 10.111, 32 13 C 32 15.333, 31.556 16, 30 16 C 28.444 16, 28 15.333, 28 13 C 28 10.167, 27.778 10, 24 10 C 21.111 10, 20 9.583, 20 8.500 C 20 6.924, 19.633 6.886, 14 7.882 M 13 12.073 C 13 13.504, 13.539 14.043, 14.739 13.812 C 17.345 13.310, 17.636 10, 15.073 10 C 13.642 10, 13 10.642, 13 12.073 M 43.500 11 C 42.663 12.354, 43.792 14, 45.559 14 C 46.352 14, 47 13.100, 47 12 C 47 9.930, 44.587 9.240, 43.500 11 M 21.500 14 C 21.160 14.550, 21.179 15.480, 21.541 16.067 C 21.904 16.654, 20.131 19.034, 17.600 21.357 C 13.690 24.948, 13 26.148, 13 29.360 C 13 32.707, 12.743 33.103, 10.750 32.820 C 8.742 32.534, 8.490 31.908, 8.405 27 C 8.335 22.989, 7.929 21.500, 6.905 21.500 C 5.896 21.500, 5.415 23.121, 5.200 27.250 C 4.966 31.732, 5.218 33, 6.343 33 C 7.137 33, 8.056 33.704, 8.386 34.564 C 8.744 35.498, 9.896 36.001, 11.243 35.814 C 13.057 35.562, 13.562 36.040, 13.816 38.250 C 14.065 40.410, 14.655 41, 16.566 41 C 18.496 41, 19 41.518, 19 43.500 C 19 45.611, 19.467 46, 22 46 C 24.533 46, 25 45.611, 25 43.500 C 25 41.167, 25.333 41, 30 41 C 34.915 41, 35.688 41.642, 35.118 45.250 C 35.053 45.662, 36.350 46, 38 46 C 40.511 46, 41 45.604, 41 43.566 C 41 41.655, 41.590 41.065, 43.750 40.816 C 45.936 40.565, 46.567 39.916, 46.826 37.653 C 47.087 35.370, 47.544 34.909, 49.137 35.326 C 50.321 35.635, 51.343 35.271, 51.668 34.422 C 51.968 33.640, 52.841 33, 53.607 33 C 54.643 33, 55 31.462, 55 27 C 55 22.425, 54.656 21, 53.550 21 C 52.486 21, 52.020 22.531, 51.800 26.750 C 51.534 31.844, 51.243 32.536, 49.250 32.820 C 47.198 33.111, 47 32.736, 47 28.570 C 47 25.174, 46.614 24, 45.500 24 C 44.675 24, 44 23.325, 44 22.500 C 44 21.675, 43.518 21, 42.929 21 C 41.020 21, 39 18.208, 39 15.571 C 39 13.667, 38.481 13, 37 13 C 35.444 13, 35 13.667, 35 16 C 35 18.933, 34.889 19, 30 19 C 25.111 19, 25 18.933, 25 16 C 25 13.032, 22.855 11.807, 21.500 14 M 10.184 18.741 C 10.526 21.705, 14 23.373, 14 20.573 C 14 19.708, 14.675 19, 15.500 19 C 16.325 19, 17 18.325, 17 17.500 C 17 16.447, 15.937 16, 13.434 16 C 10.135 16, 9.891 16.206, 10.184 18.741 M 43.496 17.007 C 43.153 17.561, 43.577 18.284, 44.437 18.614 C 45.296 18.944, 46 19.841, 46 20.607 C 46 21.373, 46.900 22, 48 22 C 49.556 22, 50 21.333, 50 19 C 50 16.347, 49.660 16, 47.059 16 C 45.441 16, 43.838 16.453, 43.496 17.007 M 19.667 27.667 C 19.300 28.033, 19 29.833, 19 31.667 C 19 34.556, 19.333 35, 21.500 35 C 23.750 35, 24 34.600, 24 31 C 24 27.788, 23.639 27, 22.167 27 C 21.158 27, 20.033 27.300, 19.667 27.667 M 36 30.930 C 36 34.630, 36.233 35, 38.560 35 C 40.908 35, 41.095 34.688, 40.810 31.250 C 40.561 28.238, 40.057 27.437, 38.250 27.180 C 36.233 26.894, 36 27.282, 36 30.930 M 14 51.500 C 14 52.325, 14.450 53, 15 53 C 15.550 53, 16 52.325, 16 51.500 C 16 50.675, 15.550 50, 15 50 C 14.450 50, 14 50.675, 14 51.500 M 44 51.583 C 44 53.349, 46.153 53.042, 46.771 51.188 C 46.989 50.534, 46.454 50, 45.583 50 C 44.712 50, 44 50.712, 44 51.583"
        stroke="none"
        fill="#221f26"
        fillRule="evenodd"
      />
    </svg>
  )
}

export const DiamondIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" version="1.1">
      <path
        d="M 19.796 5.733 C 15.631 6.063, 14.543 6.693, 10.296 11.232 C 7.658 14.051, 4.537 17.373, 3.360 18.614 C 1.165 20.929, 1.596 21.677, 5.626 22.544 C 9.100 23.292, 11.001 24.271, 11.013 25.317 C 11.020 25.968, 14.845 32.279, 19.513 39.342 C 24.181 46.405, 28 52.791, 28 53.533 C 28 54.275, 28.421 55.142, 28.936 55.460 C 29.907 56.060, 29.163 52.917, 27.081 47.618 C 26.459 46.033, 26.215 43.783, 26.540 42.618 C 27.028 40.869, 26.931 40.761, 25.985 42 C 25.066 43.203, 24.957 42.955, 25.438 40.750 C 25.871 38.765, 25.645 38, 24.626 38 C 23.318 38, 22 35.985, 22 33.985 C 22 33.516, 23.238 32.990, 24.750 32.816 C 26.677 32.595, 27.500 31.930, 27.500 30.595 C 27.500 29.548, 26.825 28.568, 26 28.419 C 25.175 28.269, 21.575 27.484, 18 26.674 C 13.240 25.595, 12.361 25.174, 14.716 25.100 C 17.820 25.003, 17.955 24.819, 18.624 19.776 C 19.144 15.854, 19.509 15.044, 20.088 16.526 C 20.716 18.133, 20.873 18.185, 20.930 16.809 C 20.968 15.879, 20.550 14.840, 20 14.500 C 19.450 14.160, 19 13.009, 19 11.941 C 19 10.240, 19.726 10, 24.883 10 C 30.365 10, 30.799 9.829, 31.245 7.500 C 31.768 4.764, 31.855 4.778, 19.796 5.733 M 34.333 5.667 C 34.700 6.033, 35.300 6.033, 35.667 5.667 C 36.033 5.300, 35.733 5, 35 5 C 34.267 5, 33.967 5.300, 34.333 5.667 M 43 6.500 C 43 6.775, 43.225 7, 43.500 7 C 43.775 7, 44 6.775, 44 6.500 C 44 6.225, 43.775 6, 43.500 6 C 43.225 6, 43 6.225, 43 6.500 M 20 23 C 20 23.550, 20.450 24, 21 24 C 21.550 24, 22 23.550, 22 23 C 22 22.450, 21.550 22, 21 22 C 20.450 22, 20 22.450, 20 23 M 47.500 23 C 47.840 23.550, 48.568 24, 49.118 24 C 49.668 24, 49.840 23.550, 49.500 23 C 49.160 22.450, 48.432 22, 47.882 22 C 47.332 22, 47.160 22.450, 47.500 23 M 48.525 25.801 C 47.439 26.039, 45.961 26.968, 45.241 27.867 C 43.459 30.090, 38.870 40.204, 39.402 40.735 C 39.637 40.971, 42.406 37.740, 45.556 33.556 C 48.705 29.371, 51.106 25.818, 50.891 25.658 C 50.676 25.499, 49.611 25.563, 48.525 25.801 M 24.333 31.667 C 24.700 32.033, 25.300 32.033, 25.667 31.667 C 26.033 31.300, 25.733 31, 25 31 C 24.267 31, 23.967 31.300, 24.333 31.667 M 25 36.500 C 25 36.775, 25.225 37, 25.500 37 C 25.775 37, 26 36.775, 26 36.500 C 26 36.225, 25.775 36, 25.500 36 C 25.225 36, 25 36.225, 25 36.500 M 36 45.500 C 36 45.775, 36.225 46, 36.500 46 C 36.775 46, 37 45.775, 37 45.500 C 37 45.225, 36.775 45, 36.500 45 C 36.225 45, 36 45.225, 36 45.500 M 31 54.500 C 31 54.775, 31.225 55, 31.500 55 C 31.775 55, 32 54.775, 32 54.500 C 32 54.225, 31.775 54, 31.500 54 C 31.225 54, 31 54.225, 31 54.500"
        stroke="none"
        fill="#a9edfb"
        fillRule="evenodd"
      />
      <path
        d="M 31.618 5.715 C 31.278 6.055, 31 7.158, 31 8.167 C 31 9.741, 30.152 10, 25 10 C 19.727 10, 19 10.235, 19 11.941 C 19 13.009, 19.450 14.160, 20 14.500 C 20.550 14.840, 20.968 15.879, 20.930 16.809 C 20.873 18.185, 20.716 18.133, 20.088 16.526 C 19.509 15.044, 19.144 15.854, 18.624 19.776 C 17.955 24.819, 17.820 25.003, 14.716 25.100 C 12.361 25.174, 13.240 25.595, 18 26.674 C 21.575 27.484, 25.175 28.269, 26 28.419 C 26.825 28.568, 27.500 29.548, 27.500 30.595 C 27.500 31.930, 26.677 32.595, 24.750 32.816 C 23.238 32.990, 22 33.516, 22 33.985 C 22 35.985, 23.318 38, 24.626 38 C 25.645 38, 25.871 38.765, 25.438 40.750 C 24.957 42.955, 25.066 43.203, 25.985 42 C 26.938 40.752, 27.036 40.842, 26.565 42.538 C 26.087 44.263, 28.811 54.206, 30.086 55.390 C 30.546 55.817, 55.641 26.112, 57.978 22.376 C 59.399 20.103, 59.211 19.767, 53.039 13.540 C 47.466 7.916, 46.024 6.991, 42.062 6.494 C 39.553 6.179, 36.316 5.736, 34.868 5.510 C 33.420 5.283, 31.958 5.375, 31.618 5.715 M 6 14.500 C 3.013 17.525, 1.003 19.994, 1.534 19.987 C 2.065 19.980, 4.666 17.505, 7.313 14.487 C 9.959 11.469, 11.969 9, 11.778 9 C 11.588 9, 8.987 11.475, 6 14.500 M 1 21.509 C 1 22.169, 27.072 53, 27.629 53 C 28.404 53, 25.172 47.597, 18.055 37 C 14.177 31.225, 11.003 25.946, 11.002 25.269 C 11 24.250, 7.476 22.690, 4.833 22.538 C 4.467 22.517, 3.829 22.163, 3.417 21.750 C 2.565 20.898, 1 20.742, 1 21.509 M 20 23 C 20 23.550, 20.450 24, 21 24 C 21.550 24, 22 23.550, 22 23 C 22 22.450, 21.550 22, 21 22 C 20.450 22, 20 22.450, 20 23 M 47.500 23 C 47.840 23.550, 48.568 24, 49.118 24 C 49.668 24, 49.840 23.550, 49.500 23 C 49.160 22.450, 48.432 22, 47.882 22 C 47.332 22, 47.160 22.450, 47.500 23 M 48.525 25.801 C 47.439 26.039, 45.961 26.968, 45.241 27.867 C 43.459 30.090, 38.870 40.204, 39.402 40.735 C 39.637 40.971, 42.406 37.740, 45.556 33.556 C 48.705 29.371, 51.106 25.818, 50.891 25.658 C 50.676 25.499, 49.611 25.563, 48.525 25.801 M 24.333 31.667 C 24.700 32.033, 25.300 32.033, 25.667 31.667 C 26.033 31.300, 25.733 31, 25 31 C 24.267 31, 23.967 31.300, 24.333 31.667 M 25 36.500 C 25 36.775, 25.225 37, 25.500 37 C 25.775 37, 26 36.775, 26 36.500 C 26 36.225, 25.775 36, 25.500 36 C 25.225 36, 25 36.225, 25 36.500 M 36 45.500 C 36 45.775, 36.225 46, 36.500 46 C 36.775 46, 37 45.775, 37 45.500 C 37 45.225, 36.775 45, 36.500 45 C 36.225 45, 36 45.225, 36 45.500"
        stroke="none"
        fill="#5ebaf6"
        fillRule="evenodd"
      />
    </svg>
  )
}
