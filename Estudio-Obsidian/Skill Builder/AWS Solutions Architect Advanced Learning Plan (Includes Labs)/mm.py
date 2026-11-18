import glob,os,re
base=r"C:\Users\LENOVO\Desktop\Trabajo\Certificaciones\Estudio-SAP-C02\Estudio-Obsidian\Skill Builder\AWS Solutions Architect Advanced Learning Plan (Includes Labs)"
for m in ["AWS Solutions Architect Advanced - Optimizing Hybrid Architectures","AWS Solutions Architect Advanced - Migration and Modernization","AWS Solutions Architect Advanced - Operational Resilience"]:
    print("==",m)
    for f in sorted(glob.glob(os.path.join(base,m,"*.md"))):
        t=open(f,encoding="utf-8").read()
        print("  %-55s mermaid:%2d  math:%2d" % (os.path.basename(f)[:55], t.count("```mermaid"), len(re.findall(r"\$\$",t))//2))
