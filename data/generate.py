import random

random.seed(42)

with open("variants.csv", "w") as f:
    f.write("chromosome,position\n")
    for _ in range(1000):
        chr_num = random.choice([1, 2, 3])
        position = random.randint(1, 50_000_000)
        f.write(f"chr{chr_num},{position}\n")
