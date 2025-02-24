---
title: Using Obsidian as a blog CMS
author: Vladimir Popovic
date: 2025-02-23T00:00:00.000Z
hero_image: /norris-niman-iceland.jpg
---

Today I am looking for a way to start a new website using Obsidian as my publishing tool for blog and diary. I am mainly a tech guy, but I want to probably expand the niche of the website to, basically, myself. There are other fields of my life that I want to blog about.

Now, I am stuck with layout, design and the technology the I am going to use.

There are some interesting designs that I ran across, such as:

https://yomaru.dev
![[Pastedimage20250223163838.png]]
![Pasted image 20250223163838.png](/obsidian_images/Pasted image 20250223163838.png)

https://obsidianttrpgtutorials.com/
![[Pastedimage20250223163934.png]]

I am still thinking, should I use my existing website (which might not be the best suited for this project, but I might adapt it), or making a completely new website.

Once I decide, I will update you.

Looking through the options of using technologies for making my markdown (.md) notes publicly available, but the amount of information is overwhelming (as everything else in Web Dev technologies). The technology to build the website itself is more less easy to choose - I will go with Next.js, as it will allow me to easily integrate everything I want. The problem is the connection between my locally stored notes and the website.

Off course, Obsidian offers it's own solution with Obsidian Publish, but as a developer I want to find my own way (probably a professional deformity).

I went dozens of blog posts and videos on this subject, and finally came to conclusion that i need to create a workflow, so to copy the notes I want to publish to a separate Git repo, and then push them to GitHub. In this way I will be able to use the pushed notes as a sort of CMS (content management system) for the blog on my website.
