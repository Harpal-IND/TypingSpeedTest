using Microsoft.AspNetCore.Mvc;
using TypingSpeedTest.Models;
using System;

namespace TypingSpeedTest.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            string[] samples = {
                "The quick brown fox jumps over the lazy dog, but the story does not end there. Every day brings a new opportunity to learn, grow, and improve. Typing quickly and accurately is a skill that combines focus, rhythm, and confidence. As you continue, remember that practice makes perfect, and persistence leads to mastery. So take a deep breath, relax your fingers, and keep typing smoothly without worrying about mistakes. The goal is not speed alone, but precision and consistency over time. Stay focused and enjoy the process of getting better with every word you type.",

                "Technology has changed the way we communicate, learn, and work. From powerful computers to smart devices, we now live in a world where information travels at the speed of light. Yet, the most important skill remains the same — the ability to type and express ideas clearly. A good typist blends accuracy with rhythm, turning thoughts into words that flow effortlessly across the screen.",

                "Once upon a time, in a small village surrounded by mountains, there lived a young dreamer who believed that hard work could change destiny. Every morning, they woke up before sunrise to practice their craft, knowing that each day was a new chance to improve. Like typing, success came not from speed, but from steady persistence and a heart full of hope.",

                "Data is the new oil of the digital world. Companies and individuals rely on information to make smart decisions. Learning to type efficiently helps you interact with this world faster, giving you an edge in both speed and clarity. Every word you type brings you closer to mastering digital fluency.",

                "Life is like typing a long paragraph — you may make mistakes, but you can always press backspace and start again. Success isn’t about never failing; it’s about learning from errors and continuing with more confidence. Just like in typing, rhythm and patience make all the difference."
            };

            var random = new Random();
            string text = samples[random.Next(samples.Length)];
            var model = new TypingModel { GivenText = text };
            return View(model);
        }

        [HttpPost]
        public IActionResult Result(TypingModel model)
        {
            // Frontend handles the logic, so just return view
            return View(model);
        }
    }
}
