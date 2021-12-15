using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace DarkDescent
{
    public class BackgroundScroller : MonoBehaviour
    {
		[SerializeField] private Transform player;
		[SerializeField] private float startMultiplier;

		List<float> layerMultipliers = new List<float>();

		private static float CalcMultiplier(float x, float nt, float n)
		{
			return (x - ( x / (nt - 1) * (n - 1)));
		}

        void Start()
        {
			for(uint i = 0; i < transform.childCount; i++)
			{
				layerMultipliers.Add(BackgroundScroller.CalcMultiplier(startMultiplier, transform.childCount, i + 1));
				Debug.Log(BackgroundScroller.CalcMultiplier(startMultiplier, transform.childCount, i + 1));
			}
        }

        void Update()
        {
			for(int i = 0; i < transform.childCount; i++)
			{
				Transform layer = transform.GetChild(i);
				var p = layer.transform.position;
				p.x = player.transform.position.x * layerMultipliers[i];
				p.y = player.transform.position.y * layerMultipliers[i];
				layer.transform.position = p;
			}
        }
    }
}
