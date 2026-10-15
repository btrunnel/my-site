import numpy as np
rng=np.random.default_rng()
x = rng.binomial(n=10,p=0.7)

print(x)

draws = rng.binomial(1,0.7,size=10_000)
print(draws[:12])
print(draws.mean())



rng = np.random.default_rng(seed=11)
sunny = rng.binomial(1,0.6, size=10_000)
theta= np.where(sunny ==1,)