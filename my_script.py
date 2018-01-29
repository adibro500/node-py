import numpy as np

a = np.array([1, 2, 3])   # Create a rank 1 array
print('\n',type(a))            # Prints "<class 'numpy.ndarray'>"
print('\n',a.shape)            # Prints "(3,)"
print('\n',a[0], a[1], a[2])   # Prints "1 2 3"
a[0] = 5                  # Change an element of the array
print('\n',a)                  # Prints "[5, 2, 3]"
b = np.array([[1,2,3],[4,5,6]])    # Create a rank 2 array
print('\n',b.shape)    # Prints "(2, 3)"
print('\n',b[0, 0], b[0, 1], b[1, 0])   # Prints "1 2 4"
