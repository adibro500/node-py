import numpy as np

a = np.array([1, 2, 3])   # Create a rank 1 array
print(type(a)+"\n")            # Prints "<class 'numpy.ndarray'>"
print(a.shape+"\n")            # Prints "(3,)"
print(a[0], a[1], a[2]+"\n")   # Prints "1 2 3"
a[0] = 5                  # Change an element of the array
print(a+"\n")                  # Prints "[5, 2, 3]"

b = np.array([[1,2,3],[4,5,6]])    # Create a rank 2 array
print(b.shape+"\n")                     # Prints "(2, 3)"
print(b[0, 0], b[0, 1], b[1, 0]+"\n")   # Prints "1 2 4"
